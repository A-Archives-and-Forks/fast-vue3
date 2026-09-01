export default defineEventHandler(() => {
  return `
<h1>Fast Vue3 Mock Server</h1>
<h2>Mock service is running</h2>
<ul>
  <li><a href="/api/user/login">/api/user/login (POST)</a></li>
  <li><a href="/api/user/logout">/api/user/logout (POST)</a></li>
  <li><a href="/api/user/profile">/api/user/profile (GET)</a></li>
</ul>
`;
});
