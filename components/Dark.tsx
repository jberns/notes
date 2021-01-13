export function Dark(props) {
  return (
    <div className='bg-gray-primary'>
      <div className='bg-blue-900 bg-opacity-5'>
        <div className='bg-white bg-opacity-5'>{props.children}</div>
      </div>
    </div>
  );
}
