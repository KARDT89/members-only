import Pool from "pg";

export const pool = new Pool({
    connectionString: "postgresql://dt89:<role_password>@localhost:5432/top_users"
});
