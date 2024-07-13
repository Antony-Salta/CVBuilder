
import { useState, useRef } from 'react';
import { initialSections } from './initialSections';
/**
 * 
 * @param {*} sectionText will be an list of objects containing section ID's and their correpsonding title and main content
 * setSectionText is the corresponding stateSetter from the App that makes this component.  
 * @returns 
 */
export default function InputFields({sectionText, setSectionText})
{
  const [nextID, setNextID] = useState(initialSections.length);
  //so basically, the functions accessing state variables treat them like local variables unless I use refs, which forces them to be reference variables, and get the actual state variable from heap rather than each component having a different variable in the stack.
  // another way of fixing this would be to make sections a class, which I might do
  const nextIDRef = useRef();
  nextIDRef.current = nextID;
  const [sections, setSections] = useState(initialSections);
  const sectionsRef = useRef();
  sectionsRef.current = sections;
  
  //takes the key of the section that is being called, and adds the new section after it in the array.
  function AddSection(key)
  { 
    let newSection = {id: nextIDRef.current, needsName: true, AddSection: AddSection, DeleteSection: DeleteSection}
    // console.log("in addSections");
    // console.log(sections);
    let temp = [...sectionsRef.current];
    let index = temp.findIndex((section) => section.id === key);
    
    temp = temp.toSpliced(index +1, 0, newSection);
    setSections(temp); 
    
    //  console.log("sections");
    //  console.log(sections);
    //  console.log("nextID");
    //  console.log(nextID);
    // setSections([...sectionsRef.current, newSection]);
    setNextID(nextIDRef.current+1);
  }

  //removes the section with the specified key.
  function DeleteSection(key)
  {
    setSections(sectionsRef.current.filter((section) => section.id !== key));
  }

  function handleTextAreaChange(id, isMain, event)
  {
    let newText = event.target.value;
    let newSectionText = isMain === true 
    ? {id: id, title : sectionText[id].title, main: newText} 
    : {id: id, title : newText, main: sectionText[id].main};
    
    let index = sectionText.findIndex(section => section.id === id);
    if(index === -1)
      setSectionText([...sectionText, newSectionText]);
    else
      setSectionText(sectionText.toSpliced(index, 1, newSectionText));
  
  }
  
  console.log("in render"); 
  console.log(sections);
  return ( 
  <div>
    { sections.map((section) => 
    <SectionInput key={section.id} {...section} handleInput={handleTextAreaChange}/>
    )}
    
    {sections.length === initialSections.length && <SectionButtons id ={initialSections.length-1} AddSection={() => AddSection(initialSections.length-1)} />}

  </div>)
}



function SectionInput({ id, handleInput, title = null, needsName = false, AddSection = null, DeleteSection = null})
  {
      return(
          <div>
          {needsName === true ? <> <h3>Section Title</h3> <textarea name = "Section title"onChange={(event) => handleInput(id, false, event)} /></> : <h2>{title}</h2>}
          <br></br> 
          {needsName === true && <p>Section Content</p>}
          <textarea name = "Section Content" onChange={(event) => handleInput(id, true, event)}/>
          <br></br>
          <SectionButtons id={id} AddSection={AddSection} DeleteSection={DeleteSection} />
          <br></br>
          </div>
      )
  }
  
  function SectionButtons({id, AddSection = null, DeleteSection = null})
  {
      //The AddSection and DeleteSection not null checks makes the button only if it should be deletable/ allow a section to be made underneath
      return(
          <div>
          {AddSection !== null && <button onClick={() => {AddSection(id); }}>Add Section Below</button>}
          {DeleteSection !== null && <button onClick ={() => {DeleteSection(id); }}> Delete Section</button>}
          </div>
      )
  }

