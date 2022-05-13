export const Alert = (props: any) => {
  return (
    <div className="bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded mb-2 text-center">
      <span className="sm-inline block">{props.message}</span>
    </div>
  );
};
