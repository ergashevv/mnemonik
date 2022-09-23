import { useHomeContext } from "../context/home-context";
import classNames from "classnames"
const NumbersTab = ({ tab }) => {
    const { cursorW, cursor, randomnumbers } = useHomeContext();
    console.log(cursor);
    console.log(randomnumbers);
    return (
        <>
            {
                randomnumbers.slice(190 * tab, 190 * (tab + 1)).map((item, key) => (
                    <div className={classNames("card-number", {
                        active: (key >= cursor && key < cursor + cursorW)
                    })}>
                        <p>{item}</p>
                    </div>
                ))
            }
        </>
    )
}
export default NumbersTab