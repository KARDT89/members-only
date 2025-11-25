import {Pool} from "pg";

const pool = new Pool({
    connectionString: "postgresql://dt89:pg123@localhost:5432/members_only"
});

export default pool;
