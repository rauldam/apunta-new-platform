const CourtsViewCreate = async ({ params }: { params: { id: string } }) => {

  return (
    <>
      <p>Court id: {params.id}</p>
    </>
  )
}

export default CourtsViewCreate
