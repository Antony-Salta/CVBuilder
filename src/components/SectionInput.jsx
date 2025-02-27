import SectionButtons from "./SectionButtons"

export default function SectionInput({ id, handleInput, title = null, needsName = false, AddSection = null, DeleteSection = null})
  {
      return(
          <div>
          {needsName === true ? <> <h3>Section Title</h3> <textarea name = "Section title" className="titleInput" onChange={(event) => handleInput(id, false, event)} /></> : <h2>{title}</h2>}
          {needsName === true && <p>Section Content</p>}
          <textarea name = "Section Content" className={needsName === false ? "titleInput" : ""} onChange={(event) => handleInput(id, true, event)}/>
          <br></br>
          <SectionButtons id={id} AddSection={AddSection} DeleteSection={DeleteSection} />
          <br></br>
          </div>
      )
  }
