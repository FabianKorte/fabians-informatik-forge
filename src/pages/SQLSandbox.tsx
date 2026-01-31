import { SEO } from '@/components/SEO';
import { SQLSandboxTool } from '@/components/sql-sandbox/SQLSandboxTool';

const SQLSandbox = () => {
  return (
    <>
      <SEO
        title="SQL-Sandbox | Informatik Lernplattform"
        description="Lerne SQL interaktiv mit echten Datenbankstrukturen. SELECT, WHERE, JOIN und mehr mit sofortigem Feedback."
      />
      <div className="min-h-screen pt-20 pb-12">
        <SQLSandboxTool />
      </div>
    </>
  );
};

export default SQLSandbox;
