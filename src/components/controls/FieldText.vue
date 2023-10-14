<template>
  <input
    :placeholder="placeholder"
    :value="modelValue"
    type="text"
    @input="updateInput"
  />
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
    modelValue: {
      type: String,
      required: false,
      default: "",
    },
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  display: flex;
  height: 49px;
  align-items: center;
  padding: 16px 24px;
  gap: 16px;
  border-radius: 8px;
  border: 1.5px solid #e9ecef;
  background: #fff;

  &::placeholder {
    color: #76787d;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
}
</style>
