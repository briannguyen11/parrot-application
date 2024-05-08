type PersonalLinksProps = {
  resume: string;
  linkedin: string;
  github: string;
};

const PersonalLinksCard: React.FC<PersonalLinksProps> = ({
  resume,
  linkedin,
  github,
}) => {
  return (
    <div className="shadow-light p-8 border border-border rounded-lg ">
      <div className="flex flex-col justify-left gap-1">
        <h3 className="text-xl font-bold text-center">Your Links</h3>
        <div className="mb-2">
          <h4 className="text-slate-400">Resume</h4>
          {resume ? (
            <a className="break-all" href={resume}>
              {resume}
            </a>
          ) : (
            <p>Resume Link</p>
          )}
        </div>
        <div className="mb-2">
          <h4 className="text-slate-400">LinkedIn</h4>
          {linkedin ? (
            <a className="break-all" href={linkedin}>
              {linkedin}
            </a>
          ) : (
            <p>LinkedIn Link</p>
          )}
        </div>
        <div>
          <h4 className="text-slate-400">Github</h4>
          {github ? (
            <a className="break-all" href={github}>
              {github}
            </a>
          ) : (
            <p>Github Link</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalLinksCard;
