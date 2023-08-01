const SingleEvaluation = ({param}:any) => {
  return (
    <div className="flex flex-col">
      <div>{param.evaluator.name}</div>
      <div>{param.comment}</div>
      <div>{param.m1}</div>
      <div>{param.m2}</div>
      <div>{param.m3}</div>
      <div>{param.m4}</div>
      <div>{param.m5}</div>
      <div>{param.m6}</div>
    </div>
  )
}

export default SingleEvaluation

