import { useHomeContext } from "../context/home-context";

const ResultNumbers = () => {
    const { cursorW, cursor, tab, randomnumbers } = useHomeContext();

    const newnumbers = randomnumbers.slice(190 * tab, 190 * (tab + 1)).slice(parseInt(cursor), parseInt(cursor) + parseInt(cursorW))
    console.log(newnumbers);
    return (
        <>
            {
                newnumbers?.map((item, key) => (
                    <h1 key={key} className='m-0'>
                        {item}
                    </h1>
                ))
            }
        </>
    )

}
export default ResultNumbers