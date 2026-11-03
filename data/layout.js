// 창고 배치 데이터 (단위: cm)
// - 앱의 [저장·버전] 탭 → "layout.js 내보내기"로 받은 파일로 이 파일을 통째로 교체한 뒤 git commit 하면 버전 이력이 남습니다.
// - 좌표: 도면(기자재실/탈의실 ID-307) 기준, 위에서 본 평면도의 가로 = X, 세로 = Z (cm). x/z 는 물품 바닥면 중심, y 는 띄운 높이.
// - rot: 회전 각도(°).
// - room.walls: 모서리 A에서 출발해 한 바퀴 도는 벽 목록. len=추정 길이, measured=실측 길이(있으면 우선), angle=벽 끝 모서리의 방 안쪽 각도, bulge=곡면 휨 깊이.
// - doors.wall 은 walls 순번(0=A→B), offset 은 그 벽 시작 모서리에서 문 중심까지 거리.
window.WAREHOUSE_DEFAULT = {
  "meta": {"name":"울산과학대 서부캠퍼스 청운국제관 기자재실(ID-307)","version":"0.5.0","updated":"2026-11-03","note":"도면(ID-307) 기준으로 방 모양 다시 그림 — 가구 위치는 영상 기준 추정"},
  "settings": {"snap":5},
  "room": {
    "height": 270, "sill": 80, "start": [674.9,0.0], "heading": 35.3, "source": "도면",
    "walls": [
      {"kind":"wall","len":114.6,"measured":null,"angle":125.3,"bulge":0,"memo":"문 옆 짧은 벽"},
      {"kind":"wall","len":527.1,"measured":null,"angle":90.0,"bulge":0,"memo":"끝벽(선반·캐비닛)"},
      {"kind":"window","len":270.6,"measured":null,"angle":231.9,"bulge":0,"memo":"가로 통창"},
      {"kind":"window","len":265.2,"measured":null,"angle":180.0,"bulge":0,"memo":"사선 통창(꺾여 이어짐)"},
      {"kind":"wall","len":254.2,"measured":null,"angle":90.2,"bulge":0,"memo":"창 옆 벽(배관 기둥)"},
      {"kind":"wall","len":224.6,"measured":null,"angle":89.9,"bulge":0,"memo":"안쪽 끝벽(책장)·탈의실 쪽 외벽"},
      {"kind":"wall","len":317.4,"measured":null,"angle":128.0,"bulge":0,"memo":"안쪽 벽(탈의실 문)"},
      {"kind":"wall","len":102.2,"measured":null,"angle":270.5,"bulge":0,"memo":"기둥 아래 꺾임"},
      {"kind":"wall","len":129.3,"measured":null,"angle":141.6,"bulge":0,"memo":"꺾인 벽(콘센트·파란보드)"},
      {"kind":"wall","len":454.8,"measured":null,"angle":180.0,"bulge":0,"memo":"긴 벽(판넬·캐비닛)"},
      {"kind":"glass","len":160.0,"measured":null,"angle":92.6,"bulge":0,"memo":"유리칸막이(고정창+여닫이 유리문)"}
    ],
    "doors": [
      {"wall":10,"offset":117,"width":86,"height":230,"type":"glass","name":"여닫이 유리 출입문"},
      {"wall":6,"offset":109,"width":87,"height":210,"type":"door","name":"탈의실 쪽 문"}
    ]
  },
  "zones": [
    {"id":"A","name":"A 유리문 옆·끝벽"},
    {"id":"B","name":"B 긴 벽(판넬·캐비닛)"},
    {"id":"C","name":"C 가운데·창가"},
    {"id":"D","name":"D 안쪽(기둥 너머)"}
  ],
  "items": [
    {"id":"i01","zone":"A","name":"오픈 칸막이 선반(큐비)","cat":"수납가구","type":"shelf","status":"미정","qty":1,"x":747,"z":156,"y":0,"w":120,"d":40,"h":120,"rot":90,"color":"#c9a46a","placed":true,"memo":"라벨 붙은 칸막이 선반"},
    {"id":"i02","zone":"A","name":"2도어 목재 캐비닛","cat":"수납가구","type":"cabinet","status":"미정","qty":1,"x":745,"z":266,"y":0,"w":90,"d":45,"h":180,"rot":90,"color":"#d2ad72","placed":true,"memo":""},
    {"id":"i03","zone":"A","name":"박스(캐비닛 앞)","cat":"박스·잡화","type":"pile","status":"미정","qty":1,"x":695,"z":266,"y":0,"w":60,"d":45,"h":55,"rot":90,"color":"#c8a272","placed":true,"memo":""},
    {"id":"i04","zone":"B","name":"목재 판넬·타공판 묶음","cat":"자재","type":"panel","status":"미정","qty":3,"x":551,"z":172,"y":0,"w":100,"d":15,"h":200,"rot":308,"color":"#6b4a2b","placed":true,"memo":"벽에 기대어 둠"},
    {"id":"i05","zone":"B","name":"진공청소기","cat":"장비","type":"box","status":"유지","qty":1,"x":588,"z":186,"y":0,"w":35,"d":45,"h":45,"rot":308,"color":"#e9e4d6","placed":true,"memo":""},
    {"id":"i06","zone":"B","name":"베이지 2도어 캐비닛","cat":"수납가구","type":"cabinet","status":"미정","qty":1,"x":503,"z":259,"y":0,"w":90,"d":45,"h":190,"rot":308,"color":"#e6dcc3","placed":true,"memo":""},
    {"id":"i07","zone":"B","name":"캐비닛 위 물품(가방·통·파란박스)","cat":"박스·잡화","type":"pile","status":"미정","qty":1,"x":501,"z":257,"y":190,"w":85,"d":40,"h":35,"rot":308,"color":"#555b66","placed":true,"memo":""},
    {"id":"i08","zone":"B","name":"유리장(하부 목재 수납)","cat":"수납가구","type":"glasscab","status":"미정","qty":1,"x":424,"z":360,"y":0,"w":160,"d":45,"h":185,"rot":308,"color":"#d2ad72","placed":true,"memo":"상부 유리문 안에 프린터·서류"},
    {"id":"i09","zone":"B","name":"회색 이불/쿠션(유리장 위)","cat":"생활용품","type":"soft","status":"미정","qty":1,"x":425,"z":361,"y":185,"w":150,"d":48,"h":30,"rot":308,"color":"#6d6a6a","placed":true,"memo":""},
    {"id":"i10","zone":"B","name":"키큰 목재 캐비닛","cat":"수납가구","type":"cabinet","status":"미정","qty":1,"x":348,"z":457,"y":0,"w":80,"d":45,"h":200,"rot":308,"color":"#d2ad72","placed":true,"memo":""},
    {"id":"i11","zone":"B","name":"파란 보드판","cat":"자재","type":"panel","status":"미정","qty":1,"x":301,"z":564,"y":0,"w":60,"d":5,"h":110,"rot":270,"color":"#8fa6bd","placed":true,"memo":"꺾인 벽(콘센트 있는 면)에 기대어 둠"},
    {"id":"i12","zone":"C","name":"빈백 소파","cat":"생활용품","type":"beanbag","status":"미정","qty":1,"x":687,"z":366,"y":0,"w":100,"d":100,"h":70,"rot":90,"color":"#c9d3d6","placed":true,"memo":""},
    {"id":"i13","zone":"C","name":"모니터 스탠드(삼각대)","cat":"장비","type":"stand","status":"미정","qty":1,"x":560,"z":417,"y":0,"w":60,"d":50,"h":170,"rot":308,"color":"#55595e","placed":true,"memo":""},
    {"id":"i14","zone":"C","name":"녹색 핸드카트","cat":"장비","type":"cart","status":"유지","qty":1,"x":473,"z":464,"y":0,"w":90,"d":60,"h":85,"rot":308,"color":"#4f9a4f","placed":true,"memo":""},
    {"id":"i15","zone":"C","name":"블랙 하드케이스(카트 위)","cat":"장비","type":"box","status":"미정","qty":1,"x":473,"z":464,"y":15,"w":55,"d":40,"h":30,"rot":308,"color":"#2a2a2a","placed":true,"memo":""},
    {"id":"i16","zone":"C","name":"옷 행거 A(셔츠)","cat":"행거·의류","type":"rack","status":"미정","qty":1,"x":618,"z":487,"y":0,"w":160,"d":50,"h":170,"rot":180,"color":"#8ea2c4","placed":true,"memo":"셔츠·정장"},
    {"id":"i17","zone":"C","name":"옷 행거 B(정장)","cat":"행거·의류","type":"rack","status":"미정","qty":1,"x":356,"z":603,"y":0,"w":140,"d":50,"h":170,"rot":128,"color":"#2e3b55","placed":true,"memo":""},
    {"id":"i18","zone":"C","name":"옷 행거 C(창가)","cat":"행거·의류","type":"rack","status":"미정","qty":1,"x":618,"z":559,"y":0,"w":160,"d":50,"h":170,"rot":180,"color":"#a9b8d0","placed":true,"memo":""},
    {"id":"i19","zone":"C","name":"옷 행거 D(창가)","cat":"행거·의류","type":"rack","status":"미정","qty":1,"x":412,"z":647,"y":0,"w":150,"d":50,"h":170,"rot":128,"color":"#3b3f4a","placed":true,"memo":""},
    {"id":"i20","zone":"C","name":"창가 박스 더미","cat":"박스·잡화","type":"pile","status":"미정","qty":1,"x":327,"z":745,"y":0,"w":90,"d":70,"h":65,"rot":128,"color":"#c8a272","placed":true,"memo":""},
    {"id":"i21","zone":"C","name":"대형 골판지 박스","cat":"박스·잡화","type":"box","status":"미정","qty":1,"x":737,"z":461,"y":0,"w":60,"d":60,"h":110,"rot":90,"color":"#c8a272","placed":true,"memo":""},
    {"id":"i22","zone":"D","name":"오픈 책장(바인더)","cat":"수납가구","type":"shelf","status":"유지","qty":2,"x":100,"z":919,"y":0,"w":180,"d":35,"h":200,"rot":218,"color":"#b98a52","placed":true,"memo":"바인더·서류철"},
    {"id":"i23","zone":"D","name":"책장 위 박스(HP 등)","cat":"박스·잡화","type":"pile","status":"미정","qty":1,"x":100,"z":919,"y":200,"w":170,"d":35,"h":35,"rot":218,"color":"#e8e8e8","placed":true,"memo":""},
    {"id":"i24","zone":"D","name":"안쪽창고 창쪽 벽 선반","cat":"수납가구","type":"shelf","status":"미정","qty":1,"x":211,"z":924,"y":0,"w":90,"d":40,"h":200,"rot":128,"color":"#c9a46a","placed":true,"memo":""},
    {"id":"i25","zone":"D","name":"이젤패드·박스 더미","cat":"박스·잡화","type":"pile","status":"미정","qty":1,"x":171,"z":833,"y":0,"w":140,"d":90,"h":100,"rot":308,"color":"#f2d24b","placed":true,"memo":"포스트잇 이젤패드 등"},
    {"id":"i26","zone":"D","name":"잡동사니(녹색가방·의류)","cat":"박스·잡화","type":"pile","status":"미정","qty":1,"x":146,"z":728,"y":0,"w":80,"d":60,"h":90,"rot":308,"color":"#3aa655","placed":true,"memo":"안쪽 문 앞을 막고 있음"},
    {"id":"i27","zone":"D","name":"골판지 판(기댐)","cat":"자재","type":"panel","status":"미정","qty":1,"x":247,"z":620,"y":0,"w":95,"d":10,"h":150,"rot":0,"color":"#c8a272","placed":true,"memo":""},
    {"id":"i28","zone":"D","name":"철망 그리드 선반","cat":"수납가구","type":"box","status":"미정","qty":1,"x":297,"z":815,"y":0,"w":50,"d":40,"h":60,"rot":128,"color":"#b9bec4","placed":true,"memo":""},
    {"id":"i29","zone":"D","name":"흰색 보드(기댐)","cat":"자재","type":"panel","status":"미정","qty":1,"x":175,"z":648,"y":0,"w":70,"d":8,"h":80,"rot":308,"color":"#f4f4f4","placed":true,"memo":""},
    {"id":"i30","zone":"D","name":"배관 기둥(도면)","cat":"건물","type":"box","status":"유지","qty":1,"x":259,"z":864,"y":0,"w":60,"d":40,"h":270,"rot":128,"color":"#f2d3da","placed":true,"memo":"도면에 있는 사각 기둥 — 옮기지 마세요"}
  ]
};
