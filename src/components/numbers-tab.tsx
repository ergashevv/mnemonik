import { IContext, useHomeContext } from "../context/home-context";
import classNames from "classnames"
interface IProps {
    tab: IContext;
}

const NumbersTab = ({ tab }: IProps) => {
    const { cursorW, cursor, randomnumbers } = useHomeContext();
    console.log(cursor);
    console.log(randomnumbers);
    return (
        <>
            {
                randomnumbers.slice(190 * Number(tab), 190 * (Number(tab) + 1)).map((item, key) => (
                    <div className={classNames("card-number", {
                        active: (key >= cursor && key < cursor + parseInt(cursorW!))
                    })}>
                        <p>{item}</p>
                    </div>
                ))
            }
        </>
    )
}
export default NumbersTab