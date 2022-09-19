import { useHomeContext } from "../context/home-context";
import classNames from "classnames"
const NumbersTab = () => {
    const { cursorW, numbers, cursor } = useHomeContext();
    return (
        <>
            {
                numbers.map((item, key) => (
                    <div className={classNames("card-number", {
                        active: (key >= cursor && key < cursor + parseInt(cursorW))
                    })}>
                        <p>{item}</p>
                    </div>
                ))
            }
        </>
    )
}
export default NumbersTab