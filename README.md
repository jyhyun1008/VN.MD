# VN.MD
Markdown for Visual Novel

## 메인 컨셉

깃헙 페이지에 ~~아무렇게나~~ 쓴 것을 비주얼 노벨로 변환해 줍니다. 비주얼 노벨로 읽지 않고 마크다운 페이지에서 읽어도 불편함이 없도록 하는 것을 목표로 하고 있습니다.

---

# 내가 인하지 못한 게 신경쓰이기 시작했다

## 챕터 01

```
{
  balloon: default,
  theme: #0000FF,
  chr: {
    선생님: "laoshi",
    재여: "zaiyu"
  },
  facial: {
    효과없음: none,
    웃음: smile,
    크게웃음: laugh
  },
  effect: {
    효과없음: none,
  }
}
```
// h2 및 pre 태그가 있는 페이지는 타이틀 페이지의 역할을 합니다. 또 이 페이지에서 뒤에서 쓰일 변수들을 저장하는 역할도 합니다.

---

### 어느 날
`bgm="default"`

// pageType = 'PLACE'
// 이렇게 h3 태그만 있고 blockquote와 chr이 없는 경우 시간이나 장소를 나타내는 'PLACE' 타입의 페이지가 됩니다.

---

### 강당

---

`sound="push"` `선생님; 무표정; 효과없음` `재여; 무표정; 효과없음`

### 선생님
> 여야, 일어나거라.

// pageType = 'CHRLINE'
// chr이 있는 경우 blockquote 태그가 있는지와 관계없이 'CHRLINE' 타입의 페이지가 됩니다.

---

### 재여
> ...어, 여, 여기가 어디죠?
> 생긴 것만 보면 어떤 대학교의 강당 같은데...?

// pageType = 'LINE'
// h3 태그와 blockquote 태그가 있고 chr이 없는 경우 'LINE' 타입의 페이지가 됩니다.
