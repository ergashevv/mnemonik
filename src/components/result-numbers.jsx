import { useHomeContext } from "../context/home-context";

const ResultNumbers = () => {
    const { cursorW, cursor, tab, dynum, randomnumbers } = useHomeContext();

    const newnumbers = randomnumbers.slice(dynum * tab, dynum * (tab + 1)).slice(parseInt(cursor), parseInt(cursor) + parseInt(cursorW))
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