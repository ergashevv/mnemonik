import { useHomeContext } from "../context/home-context";
import classNames from "classnames"
const NumbersTab = ({ tab }) => {
    const { cursorW, cursor, randomnumbers } = useHomeContext();
    console.log(cursor);
    return (
        <>
            {
                randomnumbers.slice(190 * tab, 190 * (tab + 1)).map((item, key) => (
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