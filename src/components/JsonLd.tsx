/** Emits one or more schema.org objects as JSON-LD. */
const JsonLd: React.FC<{ data: object | object[] }> = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(Array.isArray(data) ? data : [data]),
    }}
  />
);

export default JsonLd;
