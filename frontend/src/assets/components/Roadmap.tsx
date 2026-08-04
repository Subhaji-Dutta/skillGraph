<h2 className="text-2xl mt-10 mb-3">
Roadmap
</h2>

{roadmap.map((r:any)=>(

<div key={r.prerequisite}>

{r.prerequisite}

</div>

))}