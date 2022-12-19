
# MOVEL

![아이콘](https://github.com/jyhyun1008/VN.MD/raw/main/vnmd.png)

> Markdown for Visual Novel

## 메인 컨셉

깃허브 페이지에서 쓴 **마크다운 문서**를 비주얼 노벨로 변환해 줍니다. 비주얼 노벨로 읽지 않고 마크다운 페이지에서 읽어도 불편함이 없도록 하는 것을 목표로 하고 있습니다.

# 기능

## 세로보기

MOVEL은 **세로보기**를 전제로 작업되고 있습니다. 스마트폰의 웹브라우저를 가지고 가로로 비주얼노벨을 플레이하는 것은 별도의 조작이 필요하기 때문에 번거롭습니다. 물론 반응형 인터페이스를 통해 데스크탑에서 플레이하더라도 어색해 보이지 않도록 만들고 있습니다.

## 마크다운 보기

왼쪽 위의 클립보드 아이콘을 누르면, **마크다운 문서 보기** 를 지원합니다. 비주얼 노벨을 플레이할 수 없는 상황에 있는 사람이나, 여태까지 봤던 **로그** 를 한번에 읽고 싶은 분들이 이용할 수 있습니다. 

# 구조

## 제목 및 부제목

아래와 같이 `#`, `##` 를 통해 변환할 비주얼 노벨의 제목 및 부제목을 설정할 수 있습니다. 제목을 설정할 때에는 **맨 첫 줄이더라도 꼭 한 줄 개행해 주세요.** 개행하지 않으면 제대로 인식되지 않습니다.

```

# 제목
## 부제목

```

## 옵션

아래와 같은 JSON 코드를 통해 각종 옵션들을 설정할 수 있습니다. 아무 옵션도 지정하지 않는다고 해서 디폴트 값이 사용되는 것은 아니니 유념해 주세요. ~~이미 옵션이 아니잖아~~ 옵션은 각 마크다운 문서별로 설정할 수 있습니다.

```
{
  balloon: "default",
  theme: "#5bd485",
  chr: {
    선생님: "Laoshi",
    재여: "Zaiyu"
  },
  facial: {
    무표정: "none",
    웃음: "smile",
    크게웃음: "laugh"
  },
  effect: {
    효과없음: "none",
  }
}
```

### balloon

대사창의 모양을 결정합니다. 현재는 `default` 밖에 지원하지 않습니다.

### theme

테마 색상입니다.

### chr

캐릭터의 이름 아래에 일러스트 파일이 저장된 폴더를 태그할 수 있습니다.

### facial

각 캐릭터가 가지고 있는 감정 표현 세트입니다. 이 세트는 캐릭터별로 지정할 수 없으니 참고해서 작업하시기 바랍니다.

### effect

캐릭터의 동작이라든지 각종 효과를 적용할 수 있도록 할 계획입니다만 현재는 지원하지 않습니다. "none" 으로 해 두면 아무 효과도 적용되지 않습니다.


## 페이지 구분

```
---
```
을 통해 한 화면에 보이는 페이지를 구분할 수 있습니다. 만약 페이지를 구분하지 않는다면, **가장 아래쪽에 설정하신 내용만이 반영된 채 나타납니다.**


## 태그 설정

태그를 통해 모든 멀티미디어 요소, 즉 배경 그림, 배경음악, 효과음 및 캐릭터를 설정할 수 있습니다. 

태그에는 총 두 종류가 있습니다. 첫번째는 마크다운 문서에 접근하는 유저들에게도 보이는 부분으로, 태그가 변경되었음을 알리는 `&#96;property=value&#96;` 태그, 두번째는 유저들에게는 보이지 않는 부분으로, 이전 페이지의 태그를 다음 페이지에도 유지하겠다는 의미의 `&lt;!--주석--&gt;` 태그입니다. (효과음은 유지할 수 없습니다.)

### 화면에 나타나는 배경 그림, 배경음악, 캐릭터를 바꾸고, 효과음을 넣고 싶을 때

```
&#96;bgm=default&#96; &#96;bg=lecture_room&#96; &#96;sound=push&#96;
```

각 태그 사이사이를 제외한 문자열에 띄어쓰기를 넣지 말아주세요.

캐릭터의 경우, 따로 `=`으로 구분하지 않고 캐릭터의 이름을 그대로 태그합니다. 대신, 표정과 캐릭터 효과를 함께 태그합니다. 표정이 없으면 이미지 파일 로드 자체가 되지 않고, 캐릭터 효과도 마찬가지입니다. 캐릭터 효과가 없을 경우 '효과없음'으로 꼭 지정해주세요.

```
&#96;재여; 무표정; 효과없음&#96;
```

이 경우에는 각 옵션 사이에 공백을 넣습니다.

### 이전 화면에 나타나는 배경 그림, 배경음악, 캐릭터를 이번 페이지에도 유지하고 싶을 때

```
&lt;!--bgm--&gt; &lt;!--bg--&gt; &lt;!--chr--&gt;
```

각 태그 사이사이를 제외한 문자열에 공백을 넣지 말아주세요.

만약 캐릭터의 표정이나 효과 등이 바뀐다면 `property=value` 태그를 다시 사용하여 지정해 주셔야 합니다.

## 시간, 장소

```
### 시간 또는 장소
```

## 대사창

```
### 인물 이름

> 대사 1

> 대사 2

> 대사 3
```

대사는 총 세 줄까지 입력 가능합니다.

# 파일 형식

모든 이미지는 `.png`형식으로, 모든 오디오는 `.mp3` 형식으로 저장해주세요.

## 배경

어떤 사이즈든 가능합니다.

## 캐릭터

1:2 비율의 전신 일러스트를 추천드립니다. 

# 예시

[ep/sample.md](./md.html?ep=sample)에 저장되어 있습니다만 다시 한번 꺼내 보겠습니다.

---

# 내가 인하지 못한 게<br>신경쓰이기 시작했다

## 챕터 01

```
{
  balloon: "default",
  theme: "#5bd485",
  chr: {
    선생님: "Laoshi",
    재여: "Zaiyu"
  },
  facial: {
    무표정: "none",
    웃음: "smile",
    크게웃음: "laugh"
  },
  effect: {
    효과없음: "none",
  }
}
```

---

`bgm=default` `bg=lecture_room`
### 어느 날

---

<!--bgm--> <!--bg-->
### 강당

---

<!--bgm--> <!--bg-->
`sound=push` `선생님; 무표정; 효과없음` `재여; 무표정; 효과없음`

### 선생님
> 여야, 일어나거라.

---

<!--bgm--> <!--bg--> <!--chr-->
### 재여
> ...어, 여, 여기가 어디죠?

> 생긴 것만 보면 어떤 대학교의 강당 같은데...?
