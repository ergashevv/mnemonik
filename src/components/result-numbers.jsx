import { useHomeContext } from "../context/home-context";

const ResultNumbers = () => {
    const { cursorW, numbers, cursor } = useHomeContext();
    const newnumbers = numbers.slice(parseInt(cursor), parseInt(cursor) + parseInt(cursorW))
    return (
        <>
            {
                newnumbers?.map((item, key) => (
                    <h1 className='m-0'>
                        {item}
                    </h1>
                ))
            }
        </>
    )

}
export default ResultNumbers