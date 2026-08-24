export const scrollDashboardToTop = () => {
  const scrollableElement = document.querySelector(
    'main.overflow-y-auto'
  );

  if (scrollableElement) {
    scrollableElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } else {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};