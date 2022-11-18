const useScroll = () => {
  const scrollDown = () => {
    window.scroll({
      top: document.body.offsetHeight,
      left: 0,
      behavior: 'smooth',
    })
  }

  return {
    scrollDown: {
      onClick: scrollDown,
    },
  }
}

export default useScroll
