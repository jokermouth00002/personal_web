<template lang='pug'>
  div(class="home")
    initialMsg(v-if='openInitialMsg')
    countMsg(v-if='openCountMsg')
    .banner(:class='{changeBg:show}')
      .totalKey {{`鑰匙數量${keyNumber}/2`}}
      .firstKey(v-for='i in firstKey',@click='addkeyNumber(firstKey)')
        a(title='恭喜你!找到第一把鑰匙')
          img(src='key.gif')
      .clouds-bottom(v-if='!show')
        div(v-for='(img,i) in cloudImgArray[0]')
          img(:src='img.src',:style='img.style')
      .clouds-top
        div(v-for='(img,i) in cloudImgArray[1]')
          img(:src='img.src',:style='img.style')
    .container
      .portfolio(:class='{changeBg:show}')
        .titleBox(:class='{changeBg:show}')
          .title(ref='movieTitle',:class='{changeLeft:show}') portfolio
        .project(v-for='item in projectsInfo')
          a(:href='item.targetWeb',title='點擊進入',target='_blank',)
            img(:class='{changeTop:show}',:src='item.src',:ref='item.refImg')
          .text(:class='{changeOpacity:show}',:ref='item.refText') {{item.text}}

      .aboutMe(:class='{changeBg:show}')
        .box
          .info
            .title 科技樹
            .skill
              p(v-for='item in skillText') {{item}}

          .pic
            img(:src='meImgSrc')
            .text
              p(v-for='item in picText') {{item}}
            .secondKey(v-for='i in secondKey',@click='addkeyNumber(secondKey)')
              a(title='好想看這白癡那天的糗照喔~~')
                img(src='key.gif')
      .showInfinite_Scroll(v-if='!show')
        addElement(v-for='i in pageNumber',:number='pageNumber',:key='i')

</template>

<script>
// @ is an alias to /src
import addElement from '@/components/addElement.vue'
import initialMsg from '@/components/InitialMsg.vue'
import countMsg from '@/components/CountMsg.vue'

// "aws s3 cp dist s3://profile.christsao.me --recursive --acl=public-read --profile=default",
export default {
  name: 'Home',
  components: {
    initialMsg,
    addElement,
    countMsg
  },
  data() {
    return {
      cloudImgArray: [
        [
          { src: '/cloud1.png', style: '--i:1' },
          { src: '/cloud2.png', style: '--i:2' },
          { src: '/cloud3.png', style: '--i:3' },
          { src: '/cloud4.png', style: '--i:4' },
          { src: '/cloud5.png', style: '--i:5' },
          { src: '/cloud1.png', style: '--i:6' },
          { src: '/cloud2.png', style: '--i:7' },
          { src: '/cloud3.png', style: '--i:8' },
          { src: '/cloud4.png', style: '--i:9' },
          { src: '/cloud5.png', style: '--i:10' }
        ],
        [
          { src: '/cloud1.png', style: '--i:1' },
          { src: '/cloud2.png', style: '--i:2' },
          { src: '/cloud3.png', style: '--i:3' },
          { src: '/cloud4.png', style: '--i:4' },
          { src: '/cloud5.png', style: '--i:5' },
          { src: '/cloud1.png', style: '--i:6' },
          { src: '/cloud2.png', style: '--i:7' },
          { src: '/cloud3.png', style: '--i:8' },
          { src: '/cloud4.png', style: '--i:9' },
          { src: '/cloud5.png', style: '--i:10' }
        ]
      ],
      projectsInfo: [
        {
          refImg: 'storeImg',
          refText: 'storeText',
          webName: '/web_store',
          src: '/web_store.png',
          targetWeb: 'https://shop-demo.christsao.me/',
          text: '電商網站'
        },
        {
          refImg: 'musicImg',
          refText: 'musicText',
          webName: '/web_music',
          src: '/web_music.png',
          targetWeb: 'https://shop-demo.christsao.me/',
          text: '音樂播放網站'
        },
        {
          refImg: 'insurreImg',
          refText: 'insurreText',
          webName: '/web_insurre',
          src: '/web_insurre.png',
          targetWeb: 'https://webstage.robinstech.com.tw/stores/rent_car/login',
          text: '羅賓斯公司保險網頁'
        }
      ],
      skillText: [
        'HTML(Pug)CSS(SCSS)',
        'JavascriptES6',
        'Vue(各組件間傳值互相溝通), Vuex(store共用變數狀態管理), Vue-Router',
        'RWD',
        'Backend Server API串接(Node.js)',
        'elementUI',
        'animeJS',
        'Infinite Scroll',
        'Parallax Scrolling'
      ],
      picText: [
        '名:ChrisTsao',
        '趣事',
        '1.傳說對決開服,納克羅斯華麗上分至傳說戰場!',
        '現今已被砲轟買分仔,僅能用趙雲棒打BCD',
        '2.想當初到夜店以為的艷遇殊不知只是冏遇...',
        '體驗過真·女人與假·女人間胸部的差異至今',
        '陰影面積還再計算中.......',
        '聽說下面有這白癡那天的糗照'
      ],
      pageNumber: 0,
      show: false,
      openInitialMsg: true,
      openCountMsg: false,
      keyNumber: 0,
      firstKey: ['true'],
      secondKey: ['true'],
      meImgSrc: '/about_me.jpg'
    }
  },
  created() {
    window.home = this
    this.pageNumber = 0

    this.$bus.$on('closeMask', () => {
      this.openInitialMsg = false
    })
    this.$bus.$on('getSecondKey', () => {
      this.keyNumber++
      this.meImgSrc = '/ugly_me.jpg'
      this.$delete(this.secondKey, 0)
      this.openCountMsg = false
    })
    this.$bus.$on('leaveMsg', () => {
      this.openCountMsg = false
    })
  },
  mounted() {
    window.onscroll = this.computedHeight
  },
  methods: {
    handleScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      const totalTop = document.body.scrollHeight
      const screenWidth = document.body.clientWidth || window.screen.width
      this.movieElement(
        this.$refs.movieTitle,
        scrollTop,
        0,
        totalTop * 0.2,
        screenWidth
      )
      this.movieElement(
        this.$refs.storeImg[0],
        scrollTop,
        totalTop * 0.15,
        totalTop * 0.3,
        screenWidth,
        this.$refs.storeText[0]
      )
      this.movieElement(
        this.$refs.musicImg[0],
        scrollTop,
        totalTop * 0.2,
        totalTop * 0.35,
        screenWidth,
        this.$refs.musicText[0]
      )
      this.movieElement(
        this.$refs.insurreImg[0],
        scrollTop,
        totalTop * 0.25,
        totalTop * 0.4,
        screenWidth,
        this.$refs.insurreText[0]
      )
    },
    movieElement(img, scrollTop, workingHeight, maxHeight, screenWidth, text) {
      let divisorOne
      let divisorTwo
      if (screenWidth < 800) {
        divisorOne = 4
        divisorTwo = 2
      } else {
        divisorOne = 8
        divisorTwo = 5.5
      }

      if (img === this.$refs.movieTitle) {
        if (scrollTop > workingHeight && scrollTop < maxHeight) {
          img.style.transform = `translateX(${scrollTop / divisorOne}%)`
        } else {
          img.style.transform = 'translateX(100%)'
        }
      } else {
        if (scrollTop > workingHeight && scrollTop < maxHeight) {
          img.style.transform = `translateY(${-(scrollTop - workingHeight) /
            divisorTwo}%)`
          text.style.opacity = '1'
          text.style.transition = 'opacity 1s ease'
        } else if (scrollTop > maxHeight) {
          img.style.transform = 'translateY(-100%)'
          text.style.opacity = '1'
          text.style.transition = 'opacity 1s ease'
        }
      }
    },
    computedHeight(ev) {
      if (
        window.innerHeight + window.pageYOffset >= document.body.scrollHeight &&
        !this.show
      ) {
        console.log(this.pageNumber)
        this.pageNumber++
      }
    },
    addkeyNumber(key) {
      if (key === this.secondKey) {
        this.openCountMsg = true
      } else {
        this.keyNumber++
        this.$delete(key, 0)
      }
    }
  },
  watch: {
    show: function(newvalue, oldvalue) {
      window.addEventListener('scroll', this.handleScroll, true)
    },
    keyNumber: function(newvalue, oldvalue) {
      if (newvalue === 2) {
        this.show = true
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      }
    }
  }
}
</script>
<style lang='scss'>
.banner {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: black;
  overflow: hidden;

  &.changeBg {
    background: url('/test06_view.jpg');
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
  }
  .clouds {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;

    &-bottom {
      img {
        position: absolute;
        bottom: 0;
        animation: animateBottom calc(14s * var(--i)) linear infinite;
      }
    }
    &-top {
      div {
        transform: rotate(180deg);
      }
      img {
        position: absolute;
        bottom: 0;
        animation: animateTop calc(14s * var(--i)) linear infinite;
      }
    }
  }
}
.totalKey {
  position: fixed;
  padding-top: 30px;
  padding-right: 45px;
  z-index: 2;
  width: 80px;
  height: 50px;
  right: 0%;
  cursor: pointer;
  color: gold;
}
.firstKey {
  z-index: 2;
  width: 150px;
  height: 150px;
  position: absolute;
  top: 50%;
  left: 50%;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
}
.container {
  width: 100%;
  background: white;
  overflow: hidden;
  .portfolio {
    width: 100%;
    height: 100%;
    background-color: black;
    &.changeBg {
      background: url('/test11_view.jpg');
      background-size: cover;
      background-attachment: fixed;
      background-position: center;
      background-repeat: no-repeat;
    }
    .project {
      width: 100%;
      position: relative;
      display: flex;
      a {
        width: 50%;
        display: flex;
      }
      img {
        padding: 5%;
        width: 100%;
        position: relative;
        z-index: 1;

        &.changeTop {
          top: 100%;
        }
      }
      .text {
        position: absolute;
        top: 50%;
        left: 50%;
        color: white;
        opacity: 1;

        &.changeOpacity {
          opacity: 0;
        }
      }
    }
  }
  .aboutMe {
    padding: 2%;
    width: 100%;
    display: flex;
    &.changeBg {
      background: url('/test08_view.jpg');
      background-size: cover;
      background-attachment: fixed;
      background-position: center;
      background-repeat: no-repeat;
    }
    .box {
      width: 100%;
      display: flex;
      color: white;

      .info {
        width: 60%;
        padding: 5%;
        color: white;
        display: flex;
        flex-direction: column;
        .title {
          padding-top: 30px;
          font-size: 25px;
        }
        .skill {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-around;
          flex-direction: column;
        }
      }
      .pic {
        padding: 5%;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        align-items: center;
        .secondKey {
          cursor: pointer;
          a {
            width: 100%;
            height: 100%;
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
        img {
          width: 50%;
        }
      }
    }
  }
}
.titleBox {
  width: 100%;
  padding-top: 24px;
  padding-left: 24px;
  height: 15vh;
  font-size: 50px;
  background-color: black;
  &.changeBg {
    background: url('/test07_view.jpg');
    background-attachment: fixed;
  }
  .title {
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    color: white;
    &.changeLeft {
      left: -100%;
    }
  }
}
.aboutMe {
  width: 100%;
  height: 100vh;
  background-color: black;
  &.changeBg {
    // background: url('/test02_view.jpg');
    // filter: blur(2px);
  }
}

@media (max-width: 768px) {
  .aboutMe {
    height: 100%;
    .box {
      flex-direction: column;
      align-items: center;
      .info {
        width: 100%;
      }
      .pic {
        width: 50%;
      }
    }
  }
  .project {
    justify-content: center;
    a {
      width: 50%;
      height: 50%;
    }
    img {
      width: 50;
      height: 50%;
    }
    .text {
      display: none;
    }
  }
}
@keyframes animateBottom {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
@keyframes animateTop {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
