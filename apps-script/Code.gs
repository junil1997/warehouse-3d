/**
 * 창고 3D 배치 — 공유 저장소 (구글 시트 + Apps Script 웹 앱)
 *
 * 설치: 구글 시트 새로 만들기 → 확장 프로그램 → Apps Script → 이 파일 내용 붙여넣기 → 저장
 *       → 배포 → 새 배포 → 유형: 웹 앱 / 실행 사용자: 나 / 액세스: 모든 사용자 → 배포
 *       → 나온 웹 앱 URL을 data/config.js 의 WAREHOUSE_API 에 넣기
 * 선택: 프로젝트 설정 → 스크립트 속성에 PASSCODE 를 넣으면 저장할 때 그 암호가 필요합니다(보기는 누구나).
 *
 * 시트 구성 (자동 생성)
 *  - versions : 저장할 때마다 한 줄. rev / 저장시각 / 저장한 사람 / 메모 / 버전 / 물품수 / 조각수 / JSON 조각들
 *  - 물품목록 : 최신 저장본의 물품 표 (보기용 — 수정은 앱에서)
 *  - 벽실측   : 최신 저장본의 벽 길이·각도 표 (보기용)
 */

const CHUNK = 45000; // 셀 하나 최대 50,000자 → 나눠 저장
const HEADER = ['rev', 'savedAt', 'editor', 'note', 'version', 'items', 'chunks', 'json'];

function doGet(e) {
  const p = (e && e.parameter) || {};
  const action = p.action || 'latest';
  if (action === 'rev') return json_(Object.assign({ ok: true }, head_()));
  if (action === 'history') return json_({ ok: true, versions: history_(Number(p.limit) || 50) });
  if (action === 'version') return json_(Object.assign({ ok: true }, readVersion_(Number(p.rev))));
  const h = head_();
  if (!h.rev) return json_({ ok: true, rev: 0, data: null });
  return json_(Object.assign({ ok: true }, readVersion_(h.rev)));
}

function doPost(e) {
  let body;
  try { body = JSON.parse(e.postData.contents); } catch (err) { return json_({ ok: false, error: 'bad_json' }); }
  const pass = PropertiesService.getScriptProperties().getProperty('PASSCODE');
  if (pass && body.passcode !== pass) return json_({ ok: false, error: 'bad_passcode' });
  if (body.action !== 'save' || !body.data || !body.data.room || !Array.isArray(body.data.items)) return json_({ ok: false, error: 'bad_request' });

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const h = head_();
    if (!body.force && (Number(body.baseRev) || 0) !== h.rev) {
      return json_(Object.assign({ ok: false, error: 'conflict' }, readVersion_(h.rev)));
    }
    const rev = h.rev + 1, at = new Date(), editor = String(body.editor || '').slice(0, 40), note = String(body.note || '').slice(0, 300);
    const data = body.data;
    data.meta = data.meta || {};
    data.meta.rev = rev;
    const txt = JSON.stringify(data);
    const chunks = [];
    for (let i = 0; i < txt.length; i += CHUNK) chunks.push("'" + txt.slice(i, i + CHUNK)); // ' = 글자로 저장
    sheet_('versions', HEADER).appendRow([rev, at, editor, note, String(data.meta.version || ''), data.items.length, chunks.length].concat(chunks));
    writeTables_(data);
    PropertiesService.getScriptProperties().setProperty('HEAD', JSON.stringify({ rev: rev, savedAt: at.toISOString(), editor: editor }));
    return json_({ ok: true, rev: rev, savedAt: at.toISOString() });
  } finally {
    lock.releaseLock();
  }
}

function head_() {
  const s = PropertiesService.getScriptProperties().getProperty('HEAD');
  return s ? JSON.parse(s) : { rev: 0 };
}

function readVersion_(rev) {
  const sh = sheet_('versions', HEADER);
  const last = sh.getLastRow();
  if (!rev || last < 2) return { rev: 0, data: null };
  const revs = sh.getRange(2, 1, last - 1, 1).getValues();
  let row = -1;
  for (let i = revs.length - 1; i >= 0; i--) if (Number(revs[i][0]) === rev) { row = i + 2; break; }
  if (row < 0) return { rev: 0, data: null, error: 'not_found' };
  const v = sh.getRange(row, 1, 1, sh.getLastColumn()).getValues()[0];
  const json = v.slice(7, 7 + Number(v[6])).join('');
  return { rev: rev, savedAt: toIso_(v[1]), editor: v[2], note: v[3], version: v[4], data: JSON.parse(json) };
}

function history_(limit) {
  const sh = sheet_('versions', HEADER);
  const last = sh.getLastRow();
  if (last < 2) return [];
  const n = Math.min(limit, last - 1);
  return sh.getRange(last - n + 1, 1, n, 6).getValues().reverse()
    .map(v => ({ rev: Number(v[0]), savedAt: toIso_(v[1]), editor: v[2], note: v[3], version: v[4], items: v[5] }));
}

function writeTables_(data) {
  const zones = {};
  (data.zones || []).forEach(z => { zones[z.id] = z.name; });
  const items = [['구역', '이름', '분류', '모양', '정리상태', '수량', '가로cm', '깊이cm', '높이cm', 'X', 'Z', '띄운높이', '회전', '배치', '메모', 'id']]
    .concat(data.items.map(it => [zones[it.zone] || it.zone, it.name, it.cat, it.type, it.status, it.qty, it.w, it.d, it.h, it.x, it.z, it.y || 0, it.rot || 0,
      it.placed === false ? '빼둠' : '배치', it.memo || '', it.id]));
  fill_('물품목록', items);

  const walls = data.room.walls || [];
  const L = i => String.fromCharCode(65 + (i % walls.length));
  const wallRows = [['벽', '종류', '추정길이cm', '실측길이cm', '끝 모서리 안쪽각도°', '휨cm', '메모']]
    .concat(walls.map((w, i) => [L(i) + '→' + L(i + 1), w.kind, w.len, w.measured || '', w.angle, w.bulge || 0, w.memo || '']));
  wallRows.push(['천장 높이', '', data.room.height, '', '', '', '']);
  fill_('벽실측', wallRows);
}

function fill_(name, rows) {
  const sh = sheet_(name);
  sh.clearContents();
  sh.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
  sh.setFrozenRows(1);
}

function sheet_(name, header) {
  const ss = SpreadsheetApp.getActive();
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    if (header) { sh.appendRow(header); sh.setFrozenRows(1); }
  }
  return sh;
}

function toIso_(d) { return d instanceof Date ? d.toISOString() : String(d || ''); }

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
