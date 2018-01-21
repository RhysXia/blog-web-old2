<template lang="pug">
    .c-upload-container
        input.c-upload-input(ref="file",type="file",:multiple="multiple",@change="handleChange")
        .trigger(@click="$refs.file.click()")
            slot

</template>

<script>
  import ajax from './ajax'

  export default {
    name: 'upload',
    props: {
      headers: {
        type: Object,
        default: () => {}
      },
      action: {
        type: String,
        required: true
      },
      name: {
        type: String,
        default: 'file'
      },
      data: {
        type: Object,
        default: () => {}
      },
      multiple: {
        type: Boolean,
        default: false
      },
      withCredentials: {
        type: Boolean,
        default: false
      },
      accept: String,
      onSuccess: Function,
      onError: Function,
      onProgress: Function
    },
    methods: {
      handleChange (ev) {
        const files = ev.target.files
        if (!files) return
        const array = []
        for (let i = 0; i < files.length; i++) {
          array.push(files[i])
        }
        this.uploadFiles(array)
      },

      uploadFiles (files) {
        const option = {
          action: this.action,
          data: this.data,
          withCredentials: this.withCredentials,
          onSuccess: this.onSuccess,
          onProgress: this.onProgress,
          onError: this.onError,
          headers: this.headers,
          filename: this.name,
          files: files
        }
        ajax(option)
      }
    }
  }
</script>

<style lang="scss" scoped>
    .c-upload-container {
        width: 100%;
        height: 100%;
        .c-upload-input {
            display: none;
        }
        .trigger {
            cursor: pointer;
        }
    }
</style>
