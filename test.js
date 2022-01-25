const runs = await github.rest.actions.listWorkflowRunsForRepo({
    owner: context.repo.owner,
    repo: context.repo.repo,
    per_page: 100,
});

for (const run of runs.data.workflow_runs) {
    console.log(`Run id ${run.id} of '${run.name}' status '${run.status}'`)
    if (run.status === 'in_progress') {
        continue;
    }

    await github.rest.actions.deleteWorkflowRunLogs({
        owner: context.repo.owner,
        repo: context.repo.repo,
        run_id: run.id,
    });


    const artifacts = await github.rest.actions.listWorkflowRunArtifacts({
        owner: context.repo.owner,
        repo: context.repo.repo,
        run_id: run.id,
        per_page: 100,
    });
    for (const artifact of artifacts.data.artifacts) {
        console.log(`artifact id ${artifact.id} of ${artifact.name}`)
        await github.rest.actions.deleteArtifact({
            owner: context.repo.owner,
            repo: context.repo.repo,
            artifact_id: artifact.id,
        });
    }
}

const artifacts = await github.rest.actions.listArtifactsForRepo({
    owner: context.repo.owner,
    repo: context.repo.repo,
    per_page: 100,
});

for (const artifact of artifacts.data.artifacts) {
    console.log(`artifact id ${artifact.id} of ${artifact.name}`)
    await github.rest.actions.deleteArtifact({
        owner: context.repo.owner,
        repo: context.repo.repo,
        artifact_id: artifact.id,
    });
}