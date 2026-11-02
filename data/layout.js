// 창고 배치 데이터 (단위: cm)
// - 앱의 [저장·버전] 탭 → "layout.js 내보내기"로 받은 파일로 이 파일을 통째로 교체한 뒤 git commit 하면 버전 이력이 남습니다.
// - 좌표: X = 입구벽(0)에서 안쪽 창고 방향, Z = 창문벽(0)에서 핑크벽 방향. x/z 는 물품 바닥면의 중심, y 는 바닥에서 띄운 높이(위에 얹은 물건).
// - rot: 0 = 정면이 창문 반대쪽(+Z)을 봄, 90/180/270 = 시계방향 회전.
// - room.walls: 모서리 A에서 출발해 한 바퀴 도는 벽 목록. len=추정 길이, measured=실측 길이(있으면 우선), angle=벽 끝 모서리의 방 안쪽 각도, bulge=곡면 휨 깊이.
// - doors.wall 은 walls 순번(0=A→B), offset 은 그 벽 시작 모서리에서 문 중심까지 거리.
window.WAREHOUSE_DEFAULT = {
  "meta": {"name":"울산과학대 창고","version":"0.4.1","updated":"2026-11-02","note":"유리 출입문을 긴 핑크벽(판넬 옆)으로 이동 — 직선 벽, 추정 치수"},
  "settings": {"snap":5},
  "room": {
    "height": 270, "sill": 80, "start": [0,450], "heading": -90,
    "walls": [
      {"kind":"wall","len":450,"measured":null,"angle":90,"bulge":0,"memo":"입구쪽 끝벽(선반·캐비닛)"},
      {"kind":"window","len":640,"measured":null,"angle":90,"bulge":0,"memo":"통창"},
      {"kind":"wall","len":40,"measured":null,"angle":270,"bulge":0,"memo":"창가 기둥 옆면"},
      {"kind":"wall","len":60,"measured":null,"angle":270,"bulge":0,"memo":"창가 기둥 앞면"},
      {"kind":"wall","len":40,"measured":null,"angle":90,"bulge":0,"memo":"창가 기둥 옆면"},
      {"kind":"window","len":100,"measured":null,"angle":90,"bulge":0,"memo":"안쪽창고 좁은 창"},
      {"kind":"wall","len":50,"measured":null,"angle":270,"bulge":0,"memo":"기둥(창 옆)"},
      {"kind":"wall","len":200,"measured":null,"angle":90,"bulge":0,"memo":"안쪽창고 창쪽 벽(선반)"},
      {"kind":"wall","len":250,"measured":null,"angle":90,"bulge":0,"memo":"안쪽창고 끝벽(책장)"},
      {"kind":"wall","len":350,"measured":null,"angle":270,"bulge":0,"memo":"안쪽창고 문쪽 벽"},
      {"kind":"wall","len":150,"measured":null,"angle":90,"bulge":0,"memo":"꺾인 벽(콘센트·파란보드)"},
      {"kind":"wall","len":470,"measured":null,"angle":180,"bulge":0,"memo":"긴 핑크벽(판넬·캐비닛)"},
      {"kind":"glass","len":180,"measured":null,"angle":90,"bulge":0,"memo":"유리칸막이(고정창+여닫이 유리문)"}
    ],
    "doors": [
      {"wall":12,"offset":125,"width":100,"height":230,"type":"glass","name":"여닫이 유리 출입문"},
      {"wall":9,"offset":55,"width":90,"height":210,"type":"door","name":"안쪽 문"}
    ]
  },
  "zones": [
    {"id":"A","name":"A 입구·서쪽 벽"},
    {"id":"B","name":"B 핑크벽 쪽 수납"},
    {"id":"C","name":"C 중앙·창가"},
    {"id":"D","name":"D 안쪽 창고"}
  ],
  "items": [
    {"id":"i01","zone":"A","name":"오픈 칸막이 선반(큐비)","cat":"수납가구","type":"shelf","status":"미정","qty":1,"x":26,"z":120,"y":0,"w":120,"d":40,"h":120,"rot":270,"color":"#c9a46a","placed":true,"memo":"라벨 붙은 칸막이 선반"},
    {"id":"i02","zone":"A","name":"2도어 목재 캐비닛","cat":"수납가구","type":"cabinet","status":"미정","qty":1,"x":29,"z":235,"y":0,"w":90,"d":45,"h":180,"rot":270,"color":"#d2ad72","placed":true,"memo":""},
    {"id":"i03","zone":"A","name":"박스(캐비닛 앞)","cat":"박스·잡화","type":"pile","status":"미정","qty":1,"x":85,"z":235,"y":0,"w":60,"d":45,"h":55,"rot":0,"color":"#c8a272","placed":true,"memo":""},
    {"id":"i04","zone":"B","name":"목재 판넬·타공판 묶음","cat":"자재","type":"panel","status":"미정","qty":3,"x":245,"z":440,"y":0,"w":120,"d":15,"h":200,"rot":180,"color":"#6b4a2b","placed":true,"memo":"벽에 기대어 둠"},
    {"id":"i05","zone":"B","name":"진공청소기","cat":"장비","type":"box","status":"유지","qty":1,"x":230,"z":405,"y":0,"w":35,"d":45,"h":45,"rot":0,"color":"#e9e4d6","placed":true,"memo":""},
    {"id":"i06","zone":"B","name":"베이지 2도어 캐비닛","cat":"수납가구","type":"cabinet","status":"미정","qty":1,"x":355,"z":427,"y":0,"w":90,"d":45,"h":190,"rot":180,"color":"#e6dcc3","placed":true,"memo":""},
    {"id":"i07","zone":"B","name":"캐비닛 위 물품(가방·통·파란박스)","cat":"박스·잡화","type":"pile","status":"미정","qty":1,"x":355,"z":427,"y":190,"w":85,"d":40,"h":35,"rot":180,"color":"#555b66","placed":true,"memo":""},
    {"id":"i08","zone":"B","name":"유리장(하부 목재 수납)","cat":"수납가구","type":"glasscab","status":"미정","qty":1,"x":485,"z":427,"y":0,"w":160,"d":45,"h":185,"rot":180,"color":"#d2ad72","placed":true,"memo":"상부 유리문 안에 프린터·서류"},
    {"id":"i09","zone":"B","name":"회색 이불/쿠션(유리장 위)","cat":"생활용품","type":"soft","status":"미정","qty":1,"x":485,"z":425,"y":185,"w":150,"d":48,"h":30,"rot":180,"color":"#6d6a6a","placed":true,"memo":""},
    {"id":"i10","zone":"B","name":"키큰 목재 캐비닛","cat":"수납가구","type":"cabinet","status":"미정","qty":1,"x":610,"z":427,"y":0,"w":80,"d":45,"h":200,"rot":180,"color":"#d2ad72","placed":true,"memo":""},
    {"id":"i11","zone":"B","name":"파란 보드판","cat":"자재","type":"panel","status":"미정","qty":1,"x":645,"z":340,"y":0,"w":60,"d":5,"h":110,"rot":90,"color":"#8fa6bd","placed":true,"memo":"꺾인 벽(콘센트 있는 면)에 기대어 둠"},
    {"id":"i12","zone":"C","name":"빈백 소파","cat":"생활용품","type":"beanbag","status":"미정","qty":1,"x":170,"z":300,"y":0,"w":100,"d":100,"h":70,"rot":0,"color":"#c9d3d6","placed":true,"memo":""},
    {"id":"i13","zone":"C","name":"모니터 스탠드(삼각대)","cat":"장비","type":"stand","status":"미정","qty":1,"x":250,"z":190,"y":0,"w":60,"d":50,"h":170,"rot":0,"color":"#55595e","placed":true,"memo":""},
    {"id":"i14","zone":"C","name":"녹색 핸드카트","cat":"장비","type":"cart","status":"유지","qty":1,"x":330,"z":300,"y":0,"w":90,"d":60,"h":85,"rot":0,"color":"#4f9a4f","placed":true,"memo":""},
    {"id":"i15","zone":"C","name":"블랙 하드케이스(카트 위)","cat":"장비","type":"box","status":"미정","qty":1,"x":335,"z":300,"y":15,"w":55,"d":40,"h":30,"rot":0,"color":"#2a2a2a","placed":true,"memo":""},
    {"id":"i16","zone":"C","name":"옷 행거 A(셔츠)","cat":"행거·의류","type":"rack","status":"미정","qty":1,"x":430,"z":200,"y":0,"w":160,"d":50,"h":170,"rot":0,"color":"#8ea2c4","placed":true,"memo":"셔츠·정장"},
    {"id":"i17","zone":"C","name":"옷 행거 B(정장)","cat":"행거·의류","type":"rack","status":"미정","qty":1,"x":590,"z":200,"y":0,"w":140,"d":50,"h":170,"rot":0,"color":"#2e3b55","placed":true,"memo":""},
    {"id":"i18","zone":"C","name":"옷 행거 C(창가)","cat":"행거·의류","type":"rack","status":"미정","qty":1,"x":470,"z":60,"y":0,"w":160,"d":50,"h":170,"rot":0,"color":"#a9b8d0","placed":true,"memo":""},
    {"id":"i19","zone":"C","name":"옷 행거 D(창가)","cat":"행거·의류","type":"rack","status":"미정","qty":1,"x":290,"z":60,"y":0,"w":150,"d":50,"h":170,"rot":0,"color":"#3b3f4a","placed":true,"memo":""},
    {"id":"i20","zone":"C","name":"창가 박스 더미","cat":"박스·잡화","type":"pile","status":"미정","qty":1,"x":120,"z":60,"y":0,"w":90,"d":70,"h":65,"rot":0,"color":"#c8a272","placed":true,"memo":""},
    {"id":"i21","zone":"C","name":"대형 골판지 박스","cat":"박스·잡화","type":"box","status":"미정","qty":1,"x":610,"z":70,"y":0,"w":60,"d":60,"h":110,"rot":0,"color":"#c8a272","placed":true,"memo":""},
    {"id":"i22","zone":"D","name":"오픈 책장(바인더)","cat":"수납가구","type":"shelf","status":"유지","qty":2,"x":982,"z":165,"y":0,"w":190,"d":35,"h":200,"rot":90,"color":"#b98a52","placed":true,"memo":"바인더·서류철"},
    {"id":"i23","zone":"D","name":"책장 위 박스(HP 등)","cat":"박스·잡화","type":"pile","status":"미정","qty":1,"x":982,"z":165,"y":200,"w":180,"d":35,"h":35,"rot":90,"color":"#e8e8e8","placed":true,"memo":""},
    {"id":"i24","zone":"D","name":"안쪽창고 창쪽 벽 선반","cat":"수납가구","type":"shelf","status":"미정","qty":1,"x":895,"z":70,"y":0,"w":120,"d":40,"h":200,"rot":0,"color":"#c9a46a","placed":true,"memo":""},
    {"id":"i25","zone":"D","name":"이젤패드·박스 더미","cat":"박스·잡화","type":"pile","status":"미정","qty":1,"x":820,"z":170,"y":0,"w":140,"d":90,"h":100,"rot":0,"color":"#f2d24b","placed":true,"memo":"포스트잇 이젤패드 등"},
    {"id":"i26","zone":"D","name":"잡동사니(녹색가방·의류)","cat":"박스·잡화","type":"pile","status":"미정","qty":1,"x":900,"z":255,"y":0,"w":80,"d":60,"h":90,"rot":0,"color":"#3aa655","placed":true,"memo":"안쪽 문 앞을 막고 있음"},
    {"id":"i27","zone":"D","name":"골판지 판(기댐)","cat":"자재","type":"panel","status":"미정","qty":1,"x":715,"z":130,"y":0,"w":130,"d":10,"h":150,"rot":90,"color":"#c8a272","placed":true,"memo":""},
    {"id":"i28","zone":"D","name":"철망 그리드 선반","cat":"수납가구","type":"box","status":"미정","qty":1,"x":930,"z":125,"y":0,"w":50,"d":40,"h":60,"rot":0,"color":"#b9bec4","placed":true,"memo":""},
    {"id":"i29","zone":"D","name":"흰색 보드(기댐)","cat":"자재","type":"panel","status":"미정","qty":1,"x":790,"z":95,"y":0,"w":100,"d":8,"h":80,"rot":15,"color":"#f4f4f4","placed":true,"memo":""}
  ]
};
