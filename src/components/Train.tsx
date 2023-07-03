import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

export default function Train({email}: {email: string}) {
    return (
        <div style={{ textAlign: 'center' }}>
                      <CircularProgress />
        <div style={{ position: 'relative' }}>
          <h1 style={{ marginTop: '20px' }}>Training underway!</h1>
          <p>Training is underway. This will take a 30-40 minutes. We'll email you when it's done at <b>{email}</b>.</p>
        </div>
      </div>
    )

}
