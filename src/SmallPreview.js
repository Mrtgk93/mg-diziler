export default function SmallPreview(props) {
  const { id, image_thumbnail_path, name } = props.diziObj;
  return (
    <div className="miniDizi">
      <img src={image_thumbnail_path} alt="" />
      <div className="miniDizi-body">
        <h4>{name}</h4>
        <button onClick={() => props.removeFromList(id)}>Çıkar ❌</button>
      </div>
    </div>
  );
}
