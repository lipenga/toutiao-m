<template>
  <div class="updata-photo">
    <img :src="value" alt="" ref="img" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { UpdataUserPhoto } from '@/api/user.js'
export default {
  name: 'popimg',
  data() {
    return {
      cropper: null
    }
  },
  props: {
    value: {
      type: [String, Object],
      required: true
    }
  },
  mounted() {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      // autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false
    })
  },
  methods: {
    onConfirm() {
      // 基于服务端的裁切使用 getData 方法获取裁切参数
      // console.log(this.cropper.getData())
      // 纯客户端裁切使用getCroppedCanvas 获取裁切的文件对象
      this.cropper.getCroppedCanvas().toBlob(async blob => {
        // 如果接口要求Content-Type是Multipart/form-data
        // 则你必须传递FormData对象
        const formData = new FormData()
        formData.append('photo', blob)
        console.log(blob)
        const { data } = await UpdataUserPhoto(formData)
        console.log(data)
        this.$emit('upimg', data.data.photo)
        this.$emit('close')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.updata-photo {
  background-color: #000;
  height: 100%;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: seashell;
    }
  }
}
.img {
  max-width: 100%;
  display: block;
}
</style>
