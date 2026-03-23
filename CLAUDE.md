# TradeForge — 자동매매 모니터링 대시보드 Claude Code 작업 지침서

## 프로젝트 개요
크몽/Upwork 포트폴리오용 자동매매 트레이딩 대시보드.
목표: 크몽 자동매매 의뢰자가 "이 사람한테 맡기면 이런 수준이 나오는구나"라고 느끼게 하는 것.
Admin Pro와 완전히 다른 디자인 — 다크 트레이딩 터미널 UI.
Option A (프론트온리, 목데이터)로 먼저 완성. 백엔드는 나중에.

## 기술 스택
- Next.js 15+ (App Router)
- TypeScript (strict)
- Tailwind CSS v4 + shadcn/ui (다크 테마 기본)
- lightweight-charts (TradingView 캔들스틱 차트)
- Recharts (보조 차트: 파이, 바, 라인)
- next-intl (i18n: 한국어/영어 전환)
- 목데이터 (JSON/상수로 관리, DB 연결 없음)
- 기본 UI: 한국어 (금액 ₩ 원화, 종목 한국 거래소 기준)
- 영어 전환 시: 금액 $USD, 종목 글로벌 거래소 기준
- Vercel 배포 예정

## 프로젝트 초기화 방법 (중요!)

### 베이스 스캐폴드
처음부터 만들지 말 것. 아래 순서로 시작:

1. `next-shadcn-dashboard-starter` (https://github.com/Kiranism/next-shadcn-dashboard-starter) clone
   - 이미 사이드바, 헤더, 라우팅, 테이블, 차트 컴포넌트가 있음
   - Next.js + shadcn/ui + Tailwind CSS 세팅 완료 상태
2. 불필요한 데모 페이지 제거 (Kanban, User 관리 등)
3. 다크 테마를 기본으로 전환
4. 사이드바 메뉴를 트레이딩 메뉴로 교체
5. lightweight-charts 설치: `pnpm add lightweight-charts`

### 대안 (위 starter가 안 맞을 경우)
Next.js를 `create-next-app`으로 새로 만들고 shadcn/ui init하되,
반드시 `cenksari/react-crypto-exchange` (https://github.com/cenksari/react-crypto-exchange)의
디자인 패턴과 컬러 시스템을 참고할 것.

---

## 디자인 시스템 (절대 준수)

### 이것은 SaaS 어드민이 아니다. 트레이딩 터미널이다.

Admin Pro와 완전히 다른 디자인이어야 한다:
- Admin Pro: 밝은 배경, 여유로운 카드 레이아웃, 비즈니스 느낌
- TradeForge: 어두운 배경, 정보 밀도 높은 레이아웃, 트레이더 터미널 느낌

### 컬러 팔레트
```css
/* 배경 */
--bg-primary: #0d1117;      /* 메인 배경 (GitHub Dark 계열) */
--bg-secondary: #161b22;    /* 카드/패널 배경 */
--bg-tertiary: #21262d;     /* 호버/active 상태 */
--bg-border: #30363d;       /* 보더 */

/* 텍스트 */
--text-primary: #e6edf3;    /* 메인 텍스트 */
--text-secondary: #8b949e;  /* 보조 텍스트 */
--text-muted: #484f58;      /* 비활성 텍스트 */

/* 시맨틱 (트레이딩 필수) */
--profit: #00c087;           /* 수익/상승 — 바이낸스 그린 */
--loss: #f6465d;             /* 손실/하락 — 바이낸스 레드 */
--warning: #f0b90b;          /* 경고/대기 — 바이낸스 옐로 */
--accent: #00d4ff;           /* 액센트 — CodeFoundry 시안 */
```

### 타이포그래피
- 영문/숫자: `JetBrains Mono` 또는 `IBM Plex Mono` (모노스페이스, 숫자 정렬 중요)
- 한글: `Pretendard` 또는 시스템 한글 폰트
- 금액/수치는 반드시 모노스페이스 폰트로 표시할 것
- 수익률은 +일 때 초록(--profit), -일 때 빨강(--loss)으로 표시

### 레이아웃 원칙
- 정보 밀도가 높아야 한다 — 트레이더는 한 화면에 많은 정보를 원함
- 카드 사이 간격은 좁게 (gap-2 ~ gap-3)
- 패딩도 최소화 (p-3 ~ p-4)
- 차트와 테이블이 화면의 대부분을 차지해야 함
- 바이낸스, 업비트의 정보 밀도를 참고할 것

### 디자인 레퍼런스 (반드시 참고)
Claude Code가 디자인을 결정할 때 아래 레퍼런스를 확인할 것:
1. Figma: CrypTrade UI Kit — 배경 #0E0E10, 다크 트레이딩 플랫폼 전체 UI
2. Figma: PopTrade Trading Dashboard UI KIT — 90+ 스크린, 다크/라이트
3. 실제 서비스: 바이낸스 트레이딩 뷰, 업비트 거래 화면
4. GitHub: cenksari/react-crypto-exchange — React 크립토 거래소 UI

---

## 다국어 지원 (i18n)

### 구현 방식
- `next-intl` 사용 (Next.js App Router 공식 호환)
- 설치: `pnpm add next-intl`
- 헤더 우측에 언어 토글 버튼: 🇰🇷 한국어 / 🇺🇸 English

### 폴더 구조
```
messages/
  ko.json    # 한국어
  en.json    # 영어
```

### 전환 시 변경되는 것
| 항목 | 한국어 (기본) | English |
|------|-------------|---------|
| UI 텍스트 | 대시보드, 매매 내역, 봇 관리... | Dashboard, Trade History, Bot Management... |
| 금액 | ₩12,847,320 | $9,847.32 |
| 종목 | BTC/KRW, ETH/KRW | BTC/USDT, ETH/USDT |
| 날짜 | 2026.03.23 15:30 | Mar 23, 2026 3:30 PM |
| 수익률 | +2.4% (동일) | +2.4% (동일) |

### 구현 우선순위
- 1단계에서 next-intl 세팅 + 언어 토글 UI만 만들어둠
- 이후 각 단계에서 텍스트를 messages/ko.json, en.json에 추가
- 마지막 단계에서 전체 번역 검수

### 왜 필요한가
- 크몽 포트폴리오: 한국어 UI로 스크린샷
- Upwork 포트폴리오: 영어 UI로 스크린샷
- 하나의 프로젝트로 두 플랫폼 커버

---

## 텔레그램 보고 규칙 (중요)

### 반드시 텔레그램으로 알려야 하는 경우
1. **단계 완료 시**: "✅ 2단계 완료: 대시보드 메인. PR #3 머지 완료. 다음 3단계(매매 내역) 시작할까요?"
2. **빌드 실패 3회 연속**: "❌ 빌드 실패 3회. 에러: [에러 요약]. 직접 확인 필요합니다."
3. **판단이 필요한 설계 결정**: "🤔 캔들스틱 차트 라이브러리가 SSR 이슈 있습니다. dynamic import로 우회할까요?"
4. **외부 의존성 문제**: "⚠️ next-shadcn-dashboard-starter 구조가 예상과 달라서 접근 방식을 바꿔야 합니다. [상황 설명]"

### 텔레그램 보고 포맷
```
[이모지] [상태]
- 완료한 것: ...
- 다음 할 것: ...
- (필요시) 확인 필요: ...
```

### 확인 없이 자율 진행하는 경우
- 각 단계 내부의 세부 커밋/PR 작업
- 빌드/린트 에러 수정 (3회 이내)
- 코드 스타일, 레이아웃 미세 조정
- 목데이터 생성
- 컴포넌트 리팩토링

### 반드시 확인 받고 진행하는 경우
- 다음 단계로 넘어갈 때
- 전체 페이지 구조/레이아웃 변경
- 새로운 라이브러리 추가
- 배포 (Vercel)

---

## 페이지 구성 (순서대로 개발)
### 사이드바 메뉴 구조
```
TradeForge (로고)
├── 대시보드        /dashboard
├── 매매 내역       /trades
├── 봇 관리         /bots
├── 포트폴리오      /portfolio
├── 백테스트        /backtest
└── 설정            /settings
    ├── API 키 관리
    └── 알림 설정
```

### 1단계: 대시보드 메인 (/dashboard)

**상단 통계 카드 4개 (가로 1줄)**
- 총 자산: ₩12,847,320 (+2.4% 24h)
- 오늘 실현 손익: +₩148,200
- 활성 봇: 3개 실행 중
- 승률: 64.2% (최근 30일)

**차트 영역 (메인, 화면의 50% 이상)**
- lightweight-charts로 BTC/KRW 캔들스틱 차트
- 1분/5분/15분/1시간/4시간/1일 타임프레임 탭
- 볼륨 바 하단에 표시
- 매수/매도 포인트 마커 표시 (화살표 또는 점)

**우측 또는 하단 패널**
- 실시간 봇 상태 카드 (각 봇별: 전략명, 종목, 상태, 오늘 수익)
- 최근 체결 내역 미니 테이블 (최근 10건)

### 2단계: 매매 내역 (/trades)

**필터 바**
- 기간: 오늘/이번주/이번달/직접입력
- 종목: 전체/BTC/ETH/SOL/XRP
- 유형: 전체/매수/매도
- 결과: 전체/수익/손실

**매매 로그 테이블**
- 컬럼: 체결시간, 종목, 매수/매도, 가격, 수량, 수수료, 실현손익, 수익률
- 수익은 초록 배경/텍스트, 손실은 빨강
- 페이지네이션
- CSV 내보내기 버튼

**일별 수익 바 차트**
- 테이블 위 또는 아래에 최근 30일 일별 수익 바 차트
- 양수는 초록, 음수는 빨강

### 3단계: 봇 관리 (/bots)

**봇 카드 리스트**
- 각 봇 카드: 전략 이름, 대상 종목, 상태(실행중/중지/에러), 오늘 수익, 총 수익
- 상태 뱃지: 실행중(초록), 중지(회색), 에러(빨강)
- 시작/중지/삭제 버튼

**봇 생성/편집 (모달 또는 별도 페이지)**
- 전략 선택: 그리드 트레이딩, RSI 역추세, 이동평균 크로스, 볼린저밴드 브레이크아웃
- 종목 선택
- 투자금 설정 (₩)
- 파라미터: 각 전략별 다른 입력 필드
  - 그리드: 상단가, 하단가, 그리드 개수
  - RSI: RSI 기간, 과매수/과매도 기준
  - 이동평균: 단기 기간, 장기 기간
  - 볼린저: 기간, 표준편차 배수
- 손절/익절 설정 (%)

### 4단계: 포트폴리오 분석 (/portfolio)

**보유 자산 요약**
- 총 자산 (원화 환산)
- 종목별 보유 비중 도넛 차트
- 보유 종목 테이블: 종목, 수량, 평단, 현재가, 평가금액, 수익률

**성과 분석**
- 누적 수익률 라인 차트 (30/60/90일)
- 일별/주별/월별 탭 전환
- 핵심 지표 카드: 총 수익률, MDD, 샤프 비율, Profit Factor, 승률

### 5단계: 백테스트 (/backtest)

**설정 패널**
- 전략 선택
- 종목 선택
- 기간 선택 (시작일~종료일, date picker)
- 초기 자본 입력
- 전략 파라미터 (봇 생성과 동일)
- "백테스트 실행" 버튼

**결과 패널**
- 수익률 곡선 라인 차트
- 벤치마크(단순 보유) 대비 비교선
- 결과 요약 카드: 총 수익률, MDD, 거래 횟수, 승률, 평균 보유 기간
- "이 설정으로 봇 생성" 버튼 (봇 관리 페이지로 이동)

### 6단계: 설정 (/settings)

**API 키 관리**
- 거래소 선택: 업비트, 빗썸, 바이낸스
- API Key + Secret Key 입력 폼
- 연결 테스트 버튼 (목데이터에서는 항상 성공)
- 등록된 키 목록 (마스킹: XXXX...XXXX)
- 키 삭제 버튼
- "API 키는 AES-256으로 암호화되어 저장됩니다" 안내 텍스트

**알림 설정**
- 텔레그램 봇 토큰 입력
- 알림 조건 토글: 체결 시, 수익 목표 도달 시, 손절 시, 봇 에러 시
- 알림 이력 로그 테이블

---

## 목데이터 요구사항

### 종목 (한국 코인 시장 기준)
- BTC/KRW, ETH/KRW, SOL/KRW, XRP/KRW, DOGE/KRW
- 각 종목별 현재가, 24시간 변동률, 거래량

### 캔들스틱 데이터
- BTC/KRW 기준 90일치 일봉 데이터 (OHLCV)
- 현실적인 가격 범위: 1억 2천만~1억 5천만원대 (2026년 3월 기준)
- 볼륨도 현실적으로

### 매매 내역
- 200건 이상 생성
- 승률 약 60% (현실적)
- 평균 수익률 +1.2%, 평균 손실률 -0.8%
- 다양한 종목, 다양한 시간대
- 최근 3개월간 분포

### 봇 상태
- 3개 봇: 그리드(BTC, 실행중), RSI(ETH, 실행중), 이평선(SOL, 중지)
- 각 봇별 오늘 거래 수, 수익

### 포트폴리오
- 보유: BTC 0.15개, ETH 2.3개, SOL 45개, USDT 500,000원
- 30일 누적 수익률 곡선 (우상향, 중간에 드로다운 있게)

---

## Git 워크플로우 규칙 (Admin Pro와 동일)

### 브랜치 전략
- `main`: 항상 배포 가능한 상태 유지
- `feat/*`: 기능 브랜치. 하나의 "기능 단위"마다 생성

### 커밋 규칙
- 잘게 쪼갠다. 하나의 커밋에 파일 변경 3~5개 이하
- 커밋 메시지 접두사: `feat:` / `fix:` / `style:` / `refactor:` / `test:` / `docs:` / `chore:`

### 커밋 작성자 규칙 (중요)
- 커밋 author는 절대 건드리지 말 것 (git config 그대로 → Jaehyun Park)
- Co-authored-by, Signed-off-by 같은 태그 넣지 말 것

### PR 규칙
- feature 브랜치 작업 완료 후 반드시 PR 생성
- PR에 스크린샷 첨부 (UI 변경 시)
- 셀프 리뷰 후 머지

---

## 자동 테스트 규칙 (PR 생성 전 필수)
- `pnpm build` — 빌드 성공 확인
- `pnpm lint` — 경고 0개 목표
- 빌드 실패 시: 에러 로그 읽고 수정, 최대 3회 재시도

---

## 작업 단계 (순서대로 진행)

### 1단계: 프로젝트 초기화 + 다크 트레이딩 테마 ✅ 완료
- [x] next-shadcn-dashboard-starter clone
- [x] 불필요한 데모 페이지/컴포넌트 제거
- [x] 다크 테마 기본 적용 (위 컬러 팔레트 적용)
- [x] 사이드바 메뉴 트레이딩 구조로 변경
- [x] 로고 "TradeForge" 텍스트 + CodeFoundry 아이콘
- [x] lightweight-charts 설치 및 기본 캔들스틱 차트 렌더링 테스트
- [x] next-intl 설치 및 세팅 (messages/ko.json, messages/en.json 기본 구조)
- [x] 헤더에 언어 토글 버튼 (🇰🇷/🇺🇸) 추가
- [x] Google Fonts에서 JetBrains Mono 추가
- [x] 빌드 확인
**PR**: `feat/init-dark-trading-theme` → main (PR #1 머지 완료)

### 2단계: 대시보드 메인 ✅ 완료
- [x] 통계 카드 4개 (총 자산, 오늘 손익, 활성 봇, 승률)
- [x] BTC/KRW 캔들스틱 차트 (lightweight-charts, 90일 목데이터)
- [x] 타임프레임 탭 (1분~1일)
- [x] 종목 전환 탭 (BTC/ETH/SOL/XRP/DOGE)
- [x] 봇 상태 카드 (3개 봇)
- [x] 최근 체결 내역 미니 테이블
- [x] 전체 i18n 적용 (사이드바, 헤더, 대시보드)
- [x] 빌드 확인
**PR**: `feat/dashboard-main` → main (PR #2 머지 완료)

### 3단계: 매매 내역 ✅ 완료
- [x] 매매 목데이터 200건 생성
- [x] 매매 로그 테이블 (10개 컬럼, 컬러 코딩, 15건 페이지네이션)
- [x] 필터 바 (기간, 종목, 유형, 결과)
- [x] 일별 수익 바 차트 (30일, Recharts)
- [x] CSV 내보내기
- [x] i18n 적용
- [x] 빌드 확인
**PR**: `feat/trade-history` → main (PR #3 머지 완료)

### 4단계: 봇 관리 ✅ 완료
- [x] 봇 카드 리스트 (3개, 상세 정보 10개 항목)
- [x] 봇 상태 뱃지 + 시작/중지 토글 + 삭제
- [x] 봇 생성 모달 (4가지 전략, 5개 종목, 투자금/손절/익절, 전략별 파라미터)
- [x] i18n 적용
- [x] 빌드 확인
**PR**: `feat/bot-management` → main (PR #4 머지 완료)

### 5단계: 포트폴리오 분석 ✅ 완료
- [x] 보유 자산 요약 + 종목별 도넛 차트
- [x] 보유 종목 테이블 (수량, 평단, 현재가, 평가금액, 수익률)
- [x] 누적 수익률 라인 차트 (30/60/90일 탭)
- [x] 핵심 지표 카드 7개 (총 수익률, MDD, 샤프 비율, Profit Factor, 승률, 거래수, 보유일)
- [x] i18n 적용
- [x] 빌드 확인
**PR**: `feat/portfolio-analysis` → main (PR #5 머지 완료)

### 6단계: 백테스트 + 설정 ✅ 완료
- [x] 백테스트 설정 패널 (전략/종목/기간/자본)
- [x] 백테스트 결과 차트 + 벤치마크 비교 + 결과 카드 5개
- [x] API 키 관리 UI (등록/마스킹/테스트/삭제)
- [x] 알림 설정 UI (텔레그램 토큰, 조건 토글, 이력 로그)
- [x] i18n 적용
- [x] 빌드 확인
**PR**: `feat/backtest-and-settings` → main (PR #6 머지 완료)

### 7단계: 배포 + README
- [ ] Vercel 배포
- [ ] 각 주요 페이지 스크린샷 캡처
- [ ] README.md 작성 (스크린샷, 기능 목록, 기술 스택, 라이브 데모 링크)
- [ ] 탭 타이틀: "TradeForge — 자동매매 모니터링 대시보드"
**PR**: `docs/readme-and-deploy` → main

---

## 코드 품질 기준

### 파일 구조 (feature-based)
```
src/ 또는 app/
  (dashboard)/
    page.tsx
  (trades)/
    page.tsx
  (bots)/
    page.tsx
    [id]/page.tsx
  (portfolio)/
    page.tsx
  (backtest)/
    page.tsx
  (settings)/
    api-keys/page.tsx
    alerts/page.tsx
components/
  charts/
    candlestick-chart.tsx    # lightweight-charts 래퍼
    profit-line-chart.tsx    # Recharts 누적 수익률
    daily-pnl-bar-chart.tsx  # Recharts 일별 손익
    asset-donut-chart.tsx    # Recharts 자산 비중
  trading/
    stat-card.tsx            # 통계 카드 (수치 + 변동률)
    bot-status-card.tsx      # 봇 상태 카드
    trade-row.tsx            # 매매 내역 행 (컬러 코딩)
    strategy-form.tsx        # 전략 파라미터 폼
  layout/
    sidebar.tsx
    header.tsx
  ui/                        # shadcn/ui 컴포넌트
data/
  mock/
    candles.ts               # 캔들스틱 데이터
    trades.ts                # 매매 내역 200건
    bots.ts                  # 봇 상태 3개
    portfolio.ts             # 보유 자산
    performance.ts           # 수익률 곡선
lib/
  utils.ts                   # 금액 포맷, 날짜 포맷, 수익률 컬러
  chart-config.ts            # lightweight-charts 설정
```

### 코딩 규칙
- TypeScript strict 모드
- any 타입 사용 금지
- 금액 표시: `toLocaleString('ko-KR') + '원'` 또는 `₩` 접두사
- 수익률 표시: 양수면 `+2.4%` (초록), 음수면 `-1.2%` (빨강)
- 날짜 표시: `YYYY.MM.DD HH:mm` 형식
- 모든 숫자/금액은 모노스페이스 폰트 클래스 적용 (`font-mono`)
- shadcn/ui 컴포넌트 우선 사용, 다크 테마 variant
- lightweight-charts는 별도 래퍼 컴포넌트로 감싸서 사용 (SSR 이슈 방지: dynamic import)

### lightweight-charts SSR 주의사항
Next.js App Router에서 lightweight-charts는 클라이언트 전용이다.
반드시 dynamic import 사용:
```tsx
import dynamic from 'next/dynamic'
const CandlestickChart = dynamic(
  () => import('@/components/charts/candlestick-chart'),
  { ssr: false }
)
```

---

## 컨텍스트 복구 규칙 (세션 재시작 시)
1. `git log --oneline -20` → 최근 커밋 확인
2. `gh pr list --state all` → PR 히스토리 확인
3. `git branch` → 현재 브랜치 확인
4. `git status` → 커밋 안 된 변경사항 확인
5. 이 CLAUDE.md의 체크리스트 → 완료/미완료 항목 확인

### 컴팩션 대비
- 각 단계 완료 시 이 CLAUDE.md의 체크리스트를 업데이트할 것 (완료 항목 [x] 체크)
- 중요한 결정사항이 있으면 이 CLAUDE.md에 기록할 것
- 세션이 길어지면 /compact 실행 전에 현재 상태를 이 CLAUDE.md에 저장할 것

---

## 자율 작업 루프

### 기본 사이클
```
1. feature 브랜치 생성
2. 코드 작성 (잘게 커밋)
3. 빌드 확인 (pnpm build)
4. 린트 확인 (pnpm lint)
5. 포맷 확인 (pnpm format:check) — 실패 시 pnpm format 후 커밋
6. 브라우저에서 시각적 확인 (dev 서버)
7. 문제 있으면 → fix 커밋 → 3번으로 돌아감
8. 문제 없으면 → PR 생성
9. PR 셀프 리뷰 (diff 확인, 코드 품질 체크)
10. 수정 필요하면 → 수정 커밋 → 9번으로
11. 머지 (gh pr merge --squash)
12. 다음 feature로 이동
```

---

## 🚀 시작 가이드 (처음 이 프로젝트를 받은 Claude Code는 여기부터)

### Step 1: GitHub 레포 생성
```bash
gh repo create tellmefrankie/tradeforge --public --description "TradeForge — 자동매매 모니터링 대시보드 | Crypto Trading Bot Dashboard"
```

### Step 2: 프로젝트 디렉토리 생성 + 베이스 스캐폴드
```bash
mkdir -p ~/projects/tradeforge
cd ~/projects/tradeforge
git clone https://github.com/Kiranism/next-shadcn-dashboard-starter.git .
rm -rf .git
git init
git remote add origin https://github.com/tellmefrankie/tradeforge.git
```

### Step 3: 의존성 설치 + 추가 패키지
```bash
pnpm install
pnpm add lightweight-charts next-intl
```

### Step 4: 로고 에셋 세팅
프로젝트 루트에 `public/` 폴더 안에 로고 파일이 있어야 한다:
```
public/
  logo.png              # CodeFoundry 큐브 아이콘 (사이드바, favicon용)
```
로고 파일은 프로젝트 루트의 `assets/CodeFoundry_profile.png`에 있다.
이 파일을 복사해서 사용할 것:
```bash
mkdir -p public
cp assets/CodeFoundry_profile.png public/logo.png
```

사이드바 로고 영역에 이 이미지를 사용하고, 옆에 "TradeForge" 텍스트를 배치할 것.
favicon도 이 이미지를 기반으로 세팅할 것.

### Step 5: 빌드 확인
```bash
pnpm build
```
빌드 성공하면 → 1단계 작업 시작.
빌드 실패하면 → 에러 로그 확인 후 수정. starter 템플릿 자체 이슈일 수 있음.

### Step 6: 초기 커밋 + 푸시
```bash
git add -A
git commit -m "chore: init from next-shadcn-dashboard-starter"
git branch -M main
git push -u origin main
```

### Step 7: 1단계 시작
```bash
git checkout -b feat/init-dark-trading-theme
```
이 CLAUDE.md의 "작업 단계 > 1단계" 체크리스트를 위에서부터 순서대로 진행.

### 작업 진행 중 핵심 원칙
1. **이 CLAUDE.md를 항상 참조** — 디자인, 컬러, 레이아웃 판단이 필요하면 여기를 먼저 봐
2. **Admin Pro 코드를 복사하지 마** — 완전히 다른 프로젝트. 다크 트레이딩 터미널 UI
3. **목데이터는 현실적으로** — 비트코인 가격이 100원이면 안 됨. 2026년 3월 한국 시장 기준
4. **각 단계 완료 시 텔레그램으로 보고** — 스크린샷 포함
5. **모르겠으면 추측하지 말고 텔레그램으로 물어봐**
