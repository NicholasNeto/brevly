export function generateLinksCsv(links: any[]) {
    const header = [
      "id",
      "originalUrl",
      "shortUrl",
      "accessCount",
      "createdAt",
    ]
  
    const rows = links.map(link => [
      link.id,
      link.originalUrl,
      link.shortUrl,
      link.accessCount,
      link.createdAt.toISOString(),
    ])
  
    return [
      header.join(","),
      ...rows.map(row => row.join(",")),
    ].join("\n")
  }
  