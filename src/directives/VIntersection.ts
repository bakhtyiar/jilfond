export default {
  mounted(el: HTMLElement, binding: { value: () => void }) {
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    const callback: IntersectionObserverCallback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        binding.value();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(el);
  },
  name: "intersection",
};
