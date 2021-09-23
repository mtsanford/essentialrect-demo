import linkedInIcon from "./assets/icons/linked_in.png";
import githubIcon from "./assets/icons/github.png";
import mediumIcon from "./assets/icons/medium.png";


function Info() {
  return (
    <div className="info">
      <div className="about">
        <div className="author author-wide">
          essentialRect was created by Mark Sanford
        </div>
        <div className="author author-narrow">essentialRect was created by</div>
        <div className="author author-narrow">Mark Sanford</div>
        <div className="links">
          <div>
            <a
              href="https://www.linkedin.com/in/mark-t-sanford"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img src={linkedInIcon} alt="" />
              Linked In
            </a>
          </div>
          <div>
            <a
              href="https://github.com/mtsanford"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img src={githubIcon} alt="" />
              Github
            </a>
          </div>
          <div>
            <a
              href="https://medium.com/@marktsanford"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img src={mediumIcon} alt="" />
              Medium
            </a>
          </div>
        </div>
      </div>
      <div className="credits">
        <div>
          Sax player photo courtesy of{" "}
          <a
            href="https://www.pexels.com/@rodnae-prod"
            target="_blank"
            rel="noreferrer noopener"
          >
            Rodnae Productions @ Pexel
          </a>
        </div>
        <div>
          Surfers photo courtesy of{" "}
          <a
            href="https://www.pexels.com/@khairulleon"
            target="_blank"
            rel="noreferrer noopener"
          >
            Khairul Leon @ Pexel
          </a>
        </div>
        <div>
          Coastline photo courtesy of{" "}
          <a
            href="https://www.pexels.com/@msbln"
            target="_blank"
            rel="noreferrer noopener"
          >
            Mario Schmidt @ Pexel
          </a>
        </div>
      </div>
    </div>
  );
}

export default Info;
