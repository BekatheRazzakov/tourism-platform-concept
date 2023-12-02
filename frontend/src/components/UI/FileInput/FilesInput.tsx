import React, { useEffect, useRef, useState } from 'react';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  image?: File | null;
  className?: string;
}

const FileInput: React.FC<Props> = ({ onChange, name, image, className }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [filenames, setFilenames] = useState<string[]>([]);

  useEffect(() => {
    if (image === null) {
      setFilenames([]);
    }
  }, [image]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const files = e.target.files;
      const fileName = Object.keys(files).map((file) => files[+file].name);
      setFilenames(fileName);
    } else {
      setFilenames([]);
    }
    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <div className={'file-input ' + className}>
        <input
          style={{ display: 'none' }}
          type="file"
          name={name}
          onChange={onFileChange}
          ref={inputRef}
          multiple
        />
        <div className="file-input-label">
          {filenames.map((name) => (
            <h6 className="file-input-label" key={name}>
              {name}
            </h6>
          ))}
        </div>
      </div>
      <button type="button" onClick={activateInput} className="file-input-btn">
        Browse
      </button>
    </>
  );
};

export default FileInput;