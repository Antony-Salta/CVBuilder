
import { useState } from 'react'

let currentID = 2;

export default function InputFields()
{
  const initialSections = [
    {id :0, title: "Name"},
    {id :1, title:"Contact Info and Socials"},
    {id: 2, needsName: true, AddSection:() => AddSection(2), DeleteSection: null}
    ];
  const [sections, setSections] = useState(initialSections);

  //takes the key of the section that is being called, and adds the new section after it in the array.
  
  function AddSection(key)
  { // This function seems to reset state every time in a weird way, plus the generated sections don't insert in the correct place, likely because they're getting deleted at the same time themselves.
    currentID++;
    let newSection = {id: currentID, needsName: true, AddSection: () => AddSection(currentID), DeleteSection: () => DeleteSection(currentID)}
    let temp = [...sections];
    let index = temp.findIndex((section) => section.id === key);
    
    temp = temp.toSpliced(index +1, 0, newSection);
    console.log("temp");
    console.log(temp);
    setSections(temp); // I know this isn't best practice, but I'm not sure what to do with these weird JS array functions
    
    console.log("sections");
    console.log(sections);
  }
  //removes the section with the specified key.
  function DeleteSection(key)
  {
    let temp = [...sections]
    temp.toSpliced(temp.findIndex((section) => section.id === key), 1)
    setSections(temp);
  }
  
  let tempSections = [...sections];
  return ( 
  <>
    { tempSections.map((section) => 
      <SectionInput key={section.id} {...section}/>
    )}
  </>)
}

function SectionInput({ title, needsName, AddSection = null, DeleteSection = null})
{
    return(
        <>
        {needsName === true ? <> <h3>Section Title</h3> <textarea name = "Section title"/></> : <h2>{title}</h2>}
        <br></br> 
        {needsName === true && <p>Section Content</p>}
        <textarea name = "Section Content"/>
        <br></br>
        {(AddSection !== null || DeleteSection !== null) && <SectionButtons AddSection={AddSection} DeleteSection={DeleteSection}/>}
        <br></br>
        </>
    )
}

function SectionButtons({AddSection, DeleteSection})
{
    //The AddSection and DeleteSection not null checks makes the button only if it should be deletable/ allow a section to be made underneath
    return(
        <>
        {AddSection !== null && <button onClick={AddSection }>Add Section Below</button>}
        {DeleteSection !== null && <button onClick ={DeleteSection}> Delete Section</button>}
        </>
    )
}

