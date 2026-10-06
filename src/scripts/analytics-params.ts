// Campaign codes only. Never forward arbitrary URL queries or form values.
export function campaignParams(search: string): Record<string, string> {
  const query = new URLSearchParams(search);
  const mapping: Record<string, string> = {
    utm_source: 'campaign_source',
    utm_medium: 'campaign_medium',
    utm_campaign: 'campaign_name',
    utm_id: 'campaign_id',
    utm_content: 'campaign_content',
  };
  const result: Record<string, string> = {};
  for (const [utm, field] of Object.entries(mapping)) {
    const value = query.get(utm);
    if (value && /^[a-zA-Z0-9_-]{1,80}$/.test(value)) result[field] = value;
  }
  return result;
}
