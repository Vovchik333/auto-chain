type Props = {
  files: File[];
}

export const FilesList: React.FC<Props> = ({files }) => {
  return (
    <ul className="text-[#F0F0F0]">
      {files.map((file, idx) => <li key={file.name + idx}>{file.name}</li>)}
    </ul>
  );
}
