import React, { memo, useCallback } from "react"

interface InputCellProps extends React.HTMLAttributes<HTMLInputElement> {
  index?: number

  success?: boolean

  failure?: boolean

  isHovered?: boolean

  value?: string

  onValue?: (val: any, index: number | undefined) => void

  focusOnPrev?: (e: any) => void
  focusOnNext?: (e: any) => void

  onShiftAdd?: (e: any, index: number | undefined) => void
  onShiftRemove?: (e: any, index: number | undefined) => void

  onHover?: (e: any, index: number | undefined) => void
  onUnhover?: (e: any, index: number | undefined) => void
}

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
  ...props
}: InputCellProps) {
  const handleKeyUp = useCallback(
    (e: any) => {
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

  const handleMouseOver = useCallback(
    (e: any) => onHover?.(e, index),
    [index, onHover]
  )

  const handleMouseLeave = useCallback(
    (e: any) => onUnhover?.(e, index),
    [index, onUnhover]
  )

  return (
    <input
      maxLength={1}
      type="number"
      value={value}
      min={1}
      pattern="[0-9]*"
      onKeyUp={handleKeyUp}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      {...props}
    />
  )
})
