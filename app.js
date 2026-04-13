// Les parameter fra URL
const params = new URLSearchParams(window.location.search);
const entityId = params.get("entityId");

if (!entityId) {
  console.warn("Ingen entityId i URL");
}

// Vent på iframe
const iframe = document.getElementById("viewer");

import("https://unpkg.com/@trimble/connect-workspace-api@latest")
  .then(async ({ WorkspaceAPI }) => {

    // Koble til Workspace API
    const api = await WorkspaceAPI.connect(iframe);

    if (!entityId) return;

    // Konverter IFC/entity-id til runtime-id
    const objectIds = await api.viewer.convertToObjectIds({
      entityIds: [entityId]
    });

    // Velg objekt
    await api.viewer.setObjects({
      objectIds,
      mode: "set"
    });

    // Zoom til objekt
    await api.viewer.fitObjects({
      objectIds
    });
  })
  .catch(err => console.error(err));