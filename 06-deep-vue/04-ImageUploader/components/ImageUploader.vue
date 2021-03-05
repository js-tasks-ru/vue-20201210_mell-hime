<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': loading }"
      :style="image"
    >
      <span>{{ title }}</span>
      <input
        type="file"
        accept="image/*"
        ref="image"
        class="form-control-file"
        @change="handleFileUpload($event.target.files[0])"
        @click="removeFile($event)"
      />
    </label>
  </div>
</template>

<script>
import { ImageService } from '../image-service';

export default {
  name: 'ImageUploader',

  props: {
    imageId: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    title() {
      if (!this.imageId && !this.loading) {
        return 'Загрузить изображение';
      } else if (this.loading) {
        return 'Загрузка...';
      } else if (this.imageId) {
        return 'Удалить изображение';
      }
    },

    image() {
      return this.imageId
        ? { '--bg-image': `url('${ImageService.getImageURL(this.imageId)}')` }
        : {};
    },
  },

  model: {
    prop: 'imageId',
    event: 'change',
  },

  methods: {
    handleFileUpload(file) {
      this.loading = true;
      ImageService.uploadImage(file).then((val) => {
        this.loading = false;
        this.$emit('change', val.id);
      });
    },

    removeFile(e) {
      if (this.imageId) {
        e.preventDefault();

        this.$emit('change', null);
        this.$refs.image.value = null;
      }
    },
  },
};
</script>

<style scoped>
.image-uploader .form-control-file {
  opacity: 0;
  height: 0;
}

.image-uploader .image-uploader__preview {
  --bg-image: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ),
    var(--bg-image);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader .image-uploader__preview > span {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader .image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader .image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
