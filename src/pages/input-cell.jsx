import React, { memo, useCallback } from "react"
import Form from 'react-bootstrap/Form'

export default memo(function InputCell({
  index,
  success = false,
  failure = false,
  isHovered = false,
  onValue,
  value,
  focusOnPrev,
  focusOnNext,
  onShiftAdd,
  onShiftRemove,
  onHover,
  onUnhover,
  className,
  ...props
}) {
  const handleKeyUp = useCallback(
    (e) => {
      if (/^[0-9]$/.test(e.key)) {
        onValue?.(e.key, index)
        focusOnNext?.(e)
      }

      if (e.key === "Backspace") {
        onValue?.("", index)
        focusOnPrev?.(e)
      }

      if (e.key === "ArrowRight") {
        focusOnNext?.(e)
      }

      if (e.key === "ArrowLeft") {
        focusOnPrev?.(e)
      }

      if (e.key === "+" || e.key === "=") {
        onShiftAdd?.(e, index)
      }

      if (e.key === "-") {
        onShiftRemove?.(e, index)
      }
    },
    [onValue, index, focusOnNext, focusOnPrev, onShiftAdd, onShiftRemove]
  )

  return (
    <Form.Control
      maxLength={1}
      type="number"
      min={1}
      pattern="[0-9]*"
      onKeyUp={handleKeyUp}
      onMouseOver={useCallback(
        (e) => onHover?.(e, index),
        [index, onHover]
      )}
      onMouseLeave={useCallback(
        (e) => onUnhover?.(e, index),
        [index, onUnhover]
      )}
      {...props}
    />
  )
})
