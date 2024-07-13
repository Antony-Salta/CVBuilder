
function SectionButtons({id, AddSection, DeleteSection})
{
    //The AddSection and DeleteSection not null checks makes the button only if it should be deletable/ allow a section to be made underneath
    return(
        <>
        {AddSection !== null && <button onClick={() => {AddSection} }>Add Section Below</button>}
        {DeleteSection !== null && <button onClick ={() => {DeleteSection}}> Delete Section</button>}
        </>
    )
}

export default SectionButtons;