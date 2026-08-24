import Experiences from "@/pages/Experiences";

export default function Page() {
  const scrollToTop = () => {
    let element = document.activeElement;

    while (element && element.parentElement) {
      const parent = element.parentElement;

      const style = window.getComputedStyle(parent);

      if (
        (style.overflowY === "auto" || style.overflowY === "scroll") &&
        parent.scrollHeight > parent.clientHeight
      ) {
        parent.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        return;
      }

      element = parent;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return <Experiences />;
}
