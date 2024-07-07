import SectionButtons from "./assets/SectionButtons"

function SectionInput({id, title, needsName, AddSection = null, DeleteSection = null})
{
    return(
        <>
        {needsName === true ? <> <h3>Section Title</h3> <textarea name = "Section title"/></> : <h2>{title}</h2>}
        <br></br> 
        {needsName === true && <p>Section Content</p>}
        <textarea name = "Section Content"/>
        <br></br>
        {(AddSection !== null || DeleteSection !== null) && <SectionButtons AddSection={() => AddSection(id)} DeleteSection={() => DeleteSection(id)}/>}
        <br></br>
        </>
    )
}
export default SectionInput;
