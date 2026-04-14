_(File Transfer Protocole)_
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>FTP / SFTP — Field Manual</title>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #0d0f14;
    --bg2: #141720;
    --bg3: #1b1f2c;
    --border: #2a2f42;
    --border2: #3a4060;
    --text: #c8cde0;
    --muted: #6b7494;
    --accent: #4f9cf9;
    --accent2: #7c6af7;
    --green: #3ecf8e;
    --red: #f55d5d;
    --orange: #f7a040;
    --yellow: #f0d060;
    --mono: 'JetBrains Mono', monospace;
    --sans: 'IBM Plex Sans', sans-serif;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--sans);
    font-size: 15px;
    line-height: 1.75;
    max-width: 860px;
    margin: 0 auto;
    padding: 3rem 2rem 6rem;
  }

  /* ── HEADER ── */
  .doc-header {
    border-bottom: 1px solid var(--border);
    padding-bottom: 2.5rem;
    margin-bottom: 3rem;
  }
  .doc-header .tag {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: var(--accent);
    background: rgba(79,156,249,.1);
    border: 1px solid rgba(79,156,249,.2);
    border-radius: 4px;
    padding: 3px 10px;
    display: inline-block;
    margin-bottom: 1rem;
  }
  h1 {
    font-family: var(--mono);
    font-size: 2.4rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: -.03em;
    line-height: 1.1;
    margin-bottom: .8rem;
  }
  h1 span { color: var(--accent); }
  .doc-header p {
    color: var(--muted);
    font-size: 14px;
    max-width: 560px;
  }

  /* ── SECTION ── */
  .section { margin-bottom: 3.5rem; }
  h2 {
    font-family: var(--mono);
    font-size: 1.1rem;
    font-weight: 500;
    color: #fff;
    margin-bottom: 1.25rem;
    display: flex;
    align-items: center;
    gap: .6rem;
  }
  h2 .num {
    font-size: 11px;
    color: var(--muted);
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 1px 7px;
    font-family: var(--mono);
  }
  h3 {
    font-family: var(--mono);
    font-size: .85rem;
    font-weight: 500;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: .1em;
    margin: 1.8rem 0 .8rem;
  }
  p { margin-bottom: 1rem; color: var(--text); }

  /* ── WARNING BANNER ── */
  .warn-banner {
    background: rgba(245,93,93,.07);
    border: 1px solid rgba(245,93,93,.25);
    border-left: 3px solid var(--red);
    border-radius: 6px;
    padding: 1rem 1.2rem;
    margin-bottom: 2rem;
  }
  .warn-banner p {
    font-size: 13.5px;
    color: #d8a0a0;
    margin: 0;
    display: flex;
    align-items: flex-start;
    gap: .6rem;
  }
  .warn-banner p + p { margin-top: .5rem; }
  .warn-icon { color: var(--red); font-weight: 700; flex-shrink: 0; margin-top: 2px; }

  /* ── CODE BLOCK ── */
  .codeblock {
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
    margin: 1rem 0 1.5rem;
    font-family: var(--mono);
    font-size: 13px;
  }
  .codeblock .cb-header {
    background: var(--bg2);
    border-bottom: 1px solid var(--border);
    padding: .45rem 1rem;
    display: flex;
    align-items: center;
    gap: .5rem;
    font-size: 11.5px;
    color: var(--muted);
  }
  .cb-dot { width: 8px; height: 8px; border-radius: 50%; }
  .cb-dot.r { background: #f55d5d; }
  .cb-dot.y { background: #f7a040; }
  .cb-dot.g { background: #3ecf8e; }
  .cb-label { margin-left: auto; }
  .codeblock pre {
    padding: 1rem 1.2rem;
    overflow-x: auto;
    line-height: 1.65;
  }
  .codeblock pre .cm { color: var(--muted); }
  .codeblock pre .ck { color: var(--accent); }
  .codeblock pre .cv { color: var(--green); }
  .codeblock pre .cc { color: var(--orange); }
  .codeblock pre .cw { color: var(--yellow); }
  .codeblock pre .cr { color: var(--red); }

  /* ── INLINE CODE ── */
  code {
    font-family: var(--mono);
    font-size: .87em;
    color: var(--accent);
    background: rgba(79,156,249,.08);
    border: 1px solid rgba(79,156,249,.15);
    border-radius: 3px;
    padding: 1px 5px;
  }

  /* ── COMMAND TABLE ── */
  .cmd-table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0 1.5rem;
    font-size: 13.5px;
  }
  .cmd-table thead tr {
    border-bottom: 1px solid var(--border2);
  }
  .cmd-table thead th {
    font-family: var(--mono);
    font-size: 10.5px;
    text-transform: uppercase;
    letter-spacing: .12em;
    color: var(--muted);
    padding: .5rem .8rem;
    text-align: left;
    font-weight: 500;
  }
  .cmd-table tbody tr {
    border-bottom: 1px solid var(--border);
    transition: background .12s;
  }
  .cmd-table tbody tr:hover { background: var(--bg3); }
  .cmd-table tbody tr:last-child { border-bottom: none; }
  .cmd-table td {
    padding: .55rem .8rem;
    vertical-align: top;
  }
  .cmd-table td:first-child {
    font-family: var(--mono);
    font-size: 12.5px;
    color: var(--accent);
    white-space: nowrap;
    width: 180px;
  }
  .cmd-table td:last-child {
    color: var(--text);
    font-size: 13.5px;
  }
  .cmd-table .badge {
    display: inline-block;
    font-family: var(--mono);
    font-size: 10px;
    border-radius: 3px;
    padding: 1px 6px;
    margin-left: 6px;
    vertical-align: middle;
  }
  .badge-mode { background: rgba(247,160,64,.12); color: var(--orange); border: 1px solid rgba(247,160,64,.25); }
  .badge-nav  { background: rgba(124,106,247,.12); color: var(--accent2); border: 1px solid rgba(124,106,247,.25); }
  .badge-xfer { background: rgba(62,207,142,.12); color: var(--green); border: 1px solid rgba(62,207,142,.25); }

  /* ── COMPARISON TABLE ── */
  .cmp-table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0 1.5rem;
    font-size: 13.5px;
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
  }
  .cmp-table thead tr { background: var(--bg3); }
  .cmp-table thead th {
    font-family: var(--mono);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: .1em;
    color: var(--muted);
    padding: .6rem 1rem;
    text-align: left;
    font-weight: 500;
    border-bottom: 1px solid var(--border);
  }
  .cmp-table thead th.ftp-col { color: var(--red); }
  .cmp-table thead th.sftp-col { color: var(--green); }
  .cmp-table tbody tr { border-bottom: 1px solid var(--border); }
  .cmp-table tbody tr:last-child { border-bottom: none; }
  .cmp-table tbody tr:nth-child(even) { background: rgba(255,255,255,.015); }
  .cmp-table td { padding: .55rem 1rem; vertical-align: top; }
  .cmp-table td:first-child { color: var(--muted); font-size: 12.5px; font-family: var(--mono); font-size: 12px; }
  .check { color: var(--green); }
  .cross { color: var(--red); }

  /* ── INFO BOX ── */
  .info-box {
    background: rgba(79,156,249,.06);
    border: 1px solid rgba(79,156,249,.18);
    border-left: 3px solid var(--accent);
    border-radius: 6px;
    padding: .9rem 1.1rem;
    margin: 1rem 0 1.5rem;
    font-size: 13.5px;
    color: #a0b8d8;
  }
  .info-box strong { color: var(--accent); }

  /* ── SUCCESS BOX ── */
  .success-box {
    background: rgba(62,207,142,.06);
    border: 1px solid rgba(62,207,142,.18);
    border-left: 3px solid var(--green);
    border-radius: 6px;
    padding: .9rem 1.1rem;
    margin: 1rem 0 1.5rem;
    font-size: 13.5px;
    color: #90d4b0;
  }

  /* ── DIVIDER ── */
  hr {
    border: none;
    border-top: 1px solid var(--border);
    margin: 3rem 0;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 600px) {
    body { padding: 1.5rem 1rem 4rem; }
    h1 { font-size: 1.7rem; }
    .cmd-table td:first-child { width: auto; }
  }
</style>
</head>
<body>

<div class="doc-header">
  <span class="tag">System Administration</span>
  <h1>FTP &amp; <span>SFTP</span><br>Field Manual</h1>
  <p>Setup, configuration, client usage, and security considerations — from the vsftpd daemon to encrypted file transfers.</p>
</div>

<!-- ─────────────────────────────────────────── SECTION 1 ── -->
<div class="section">
  <h2><span class="num">01</span> Why FTP Is Basically a Bad Idea</h2>

  <div class="warn-banner">
    <p><span class="warn-icon">⚠</span> <strong>Most systems don't need to act as FTP servers.</strong> If you're adding vsftpd to a production machine, ask yourself whether SFTP over SSH (which is already installed) would do the job.</p>
    <p><span class="warn-icon">⚠</span> <strong>FTP is insecure by design.</strong> Credentials, commands, and data all travel in plain text. Anyone sniffing the network sees your username, password, and every byte transferred.</p>
    <p><span class="warn-icon">⚠</span> <strong>Keeping it installed increases attack surface.</strong> Every open port and running daemon is a potential entry point. If FTP isn't strictly required, don't install it.</p>
  </div>

  <p>That said — dev environments, legacy integrations, and isolated internal networks sometimes have legitimate reasons to run FTP. Here's how to do it properly.</p>
</div>

<!-- ─────────────────────────────────────────── SECTION 2 ── -->
<div class="section">
  <h2><span class="num">02</span> Server Setup — vsftpd</h2>

  <h3>Install the daemon</h3>
  <div class="codeblock">
    <div class="cb-header"><span class="cb-dot r"></span><span class="cb-dot y"></span><span class="cb-dot g"></span><span class="cb-label">bash</span></div>
    <pre><span class="cm"># Debian / Ubuntu</span>
<span class="ck">sudo</span> apt install vsftpd -y

<span class="cm"># CentOS / RHEL / Fedora</span>
<span class="ck">sudo</span> dnf install vsftpd -y</pre>
  </div>

  <h3>Main config file</h3>
  <p>Everything lives in <code>/etc/vsftpd.conf</code>. Here's a minimal but functional configuration:</p>

  <div class="codeblock">
    <div class="cb-header"><span class="cb-dot r"></span><span class="cb-dot y"></span><span class="cb-dot g"></span><span class="cb-label">/etc/vsftpd.conf</span></div>
    <pre><span class="cm"># ── Basics ─────────────────────────────────</span>
<span class="ck">listen</span>=<span class="cv">YES</span>
<span class="ck">listen_ipv6</span>=<span class="cr">NO</span>           <span class="cm"># set to YES if you need IPv6</span>

<span class="cm"># ── Authentication ─────────────────────────</span>
<span class="ck">anonymous_enable</span>=<span class="cr">NO</span>      <span class="cm"># disable anonymous access!</span>
<span class="ck">local_enable</span>=<span class="cv">YES</span>         <span class="cm"># allow local system users</span>
<span class="ck">write_enable</span>=<span class="cv">YES</span>         <span class="cm"># allow uploads (set NO for read-only)</span>

<span class="cm"># ── Security ───────────────────────────────</span>
<span class="ck">chroot_local_user</span>=<span class="cv">YES</span>    <span class="cm"># jail users in their home dirs</span>
<span class="ck">allow_writeable_chroot</span>=<span class="cv">YES</span>
<span class="ck">userlist_enable</span>=<span class="cv">YES</span>      <span class="cm"># whitelist users via vsftpd.userlist</span>
<span class="ck">userlist_file</span>=<span class="cc">/etc/vsftpd.userlist</span>
<span class="ck">userlist_deny</span>=<span class="cr">NO</span>         <span class="cm"># allow users in the list (not deny)</span>

<span class="cm"># ── Passive mode (needed behind NAT/firewall)</span>
<span class="ck">pasv_enable</span>=<span class="cv">YES</span>
<span class="ck">pasv_min_port</span>=<span class="cw">40000</span>
<span class="ck">pasv_max_port</span>=<span class="cw">50000</span>

<span class="cm"># ── Logging ────────────────────────────────</span>
<span class="ck">xferlog_enable</span>=<span class="cv">YES</span>
<span class="ck">xferlog_file</span>=<span class="cc">/var/log/vsftpd.log</span></pre>
  </div>

  <h3>Expose a directory to clients</h3>
  <p>vsftpd maps each local user to their home directory. The cleanest pattern is to create a dedicated FTP user with a specific home:</p>

  <div class="codeblock">
    <div class="cb-header"><span class="cb-dot r"></span><span class="cb-dot y"></span><span class="cb-dot g"></span><span class="cb-label">bash</span></div>
    <pre><span class="cm"># Create the FTP user (no shell login)</span>
<span class="ck">sudo</span> useradd -m -d /srv/ftp/ftpuser -s /usr/sbin/nologin ftpuser
<span class="ck">sudo</span> passwd ftpuser          <span class="cm"># set a password interactively</span>

<span class="cm"># Ensure correct ownership so vsftpd is happy</span>
<span class="ck">sudo</span> chown root:root /srv/ftp/ftpuser
<span class="ck">sudo</span> chmod 755 /srv/ftp/ftpuser

<span class="cm"># Create a writable subdirectory for uploads</span>
<span class="ck">sudo</span> mkdir /srv/ftp/ftpuser/files
<span class="ck">sudo</span> chown ftpuser:ftpuser /srv/ftp/ftpuser/files

<span class="cm"># Add the user to the whitelist</span>
<span class="ck">echo</span> <span class="cc">"ftpuser"</span> | sudo tee -a /etc/vsftpd.userlist</pre>
  </div>

  <div class="info-box"><strong>Why root:root on the home dir?</strong> When <code>chroot_local_user=YES</code>, vsftpd refuses to chroot into a directory that is writable by the user. The pattern is: root owns the chroot jail, user owns only a subdirectory inside it.</div>

  <h3>Enable and restart</h3>
  <div class="codeblock">
    <div class="cb-header"><span class="cb-dot r"></span><span class="cb-dot y"></span><span class="cb-dot g"></span><span class="cb-label">bash</span></div>
    <pre><span class="ck">sudo</span> systemctl enable vsftpd
<span class="ck">sudo</span> systemctl restart vsftpd
<span class="ck">sudo</span> systemctl status vsftpd    <span class="cm"># verify it's running</span></pre>
  </div>
</div>

<!-- ─────────────────────────────────────────── SECTION 3 ── -->
<div class="section">
  <h2><span class="num">03</span> Client Side — Connecting &amp; Commands</h2>

  <h3>Default user / credential</h3>
  <p>vsftpd uses <strong>local system accounts</strong> — there is no default built-in user. Anonymous access is disabled in any sane config. You connect with whatever OS user you created (e.g. <code>ftpuser</code>) and the password you set with <code>passwd</code>.</p>
  <p>Some distributions ship vsftpd with anonymous login enabled out of the box. Always verify <code>anonymous_enable=NO</code> is set.</p>

  <h3>Connect</h3>
  <div class="codeblock">
    <div class="cb-header"><span class="cb-dot r"></span><span class="cb-dot y"></span><span class="cb-dot g"></span><span class="cb-label">bash</span></div>
    <pre><span class="ck">ftp</span> 192.168.1.10
<span class="cm"># or with explicit user</span>
<span class="ck">ftp</span> -u ftpuser 192.168.1.10</pre>
  </div>

  <h3>FTP Command Reference</h3>

  <table class="cmd-table">
    <thead>
      <tr>
        <th>Command</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>ftp hostname</td><td>Open a connection to an FTP server. You'll be prompted for username and password.</td></tr>
      <tr><td>get file<span class="badge badge-xfer">transfer</span></td><td>Download a single file from the remote server to your current local directory.</td></tr>
      <tr><td>put file<span class="badge badge-xfer">transfer</span></td><td>Upload a single local file to your current remote directory.</td></tr>
      <tr><td>mget *.txt<span class="badge badge-xfer">transfer</span></td><td>Download multiple files matching a pattern. Uses shell glob syntax. Prompts before each file unless <code>prompt</code> is off.</td></tr>
      <tr><td>mput *.txt<span class="badge badge-xfer">transfer</span></td><td>Upload multiple local files matching a pattern. Same prompt behavior as <code>mget</code>.</td></tr>
      <tr><td>lcd /path<span class="badge badge-nav">navigation</span></td><td><strong>Local</strong> change directory — changes where files are downloaded to / uploaded from on <em>your</em> machine.</td></tr>
      <tr><td>cd /path<span class="badge badge-nav">navigation</span></td><td><strong>Remote</strong> change directory — navigates the directory tree on the server.</td></tr>
      <tr><td>ls</td><td>List contents of the current remote directory. Add a path to list elsewhere.</td></tr>
      <tr><td>binary<span class="badge badge-mode">mode</span></td><td>Switch to binary transfer mode. <strong>Always use this</strong> for non-text files (images, archives, executables). Binary mode transfers bytes as-is.</td></tr>
      <tr><td>ascii<span class="badge badge-mode">mode</span></td><td>Switch to ASCII transfer mode. Translates line endings between systems (<code>CRLF</code> ↔ <code>LF</code>). Use for plain text files only — corrupts binary data.</td></tr>
      <tr><td>passive<span class="badge badge-mode">mode</span></td><td>Toggle passive mode. In passive mode the client initiates both connections — useful when the client is behind a NAT or firewall that blocks incoming connections.</td></tr>
      <tr><td>prompt</td><td>Toggle per-file confirmation for <code>mget</code> and <code>mput</code>. When prompt is <em>on</em>, FTP asks yes/no before each file. Turn it off to transfer all matched files without interruption.</td></tr>
      <tr><td>bye / quit</td><td>Close the connection and exit the FTP client. Both commands do the same thing.</td></tr>
    </tbody>
  </table>

  <h3>Quick session example</h3>
  <div class="codeblock">
    <div class="cb-header"><span class="cb-dot r"></span><span class="cb-dot y"></span><span class="cb-dot g"></span><span class="cb-label">ftp session</span></div>
    <pre><span class="ck">ftp</span> 192.168.1.10
<span class="cm">Connected to 192.168.1.10.</span>
<span class="cm">220 (vsFTPd 3.0.5)</span>
<span class="cm">Name: </span><span class="cv">ftpuser</span>
<span class="cm">Password: ••••••••</span>
<span class="cm">230 Login successful.</span>

ftp&gt; <span class="ck">binary</span>               <span class="cm"># always switch to binary first</span>
ftp&gt; <span class="ck">passive</span>              <span class="cm"># enable passive if behind NAT</span>
ftp&gt; <span class="ck">ls</span>
ftp&gt; <span class="ck">cd</span> files
ftp&gt; <span class="ck">lcd</span> ~/Downloads
ftp&gt; <span class="ck">prompt</span>               <span class="cm"># turn off per-file confirm</span>
ftp&gt; <span class="ck">mget</span> *.csv
ftp&gt; <span class="ck">bye</span></pre>
  </div>
</div>

<!-- ─────────────────────────────────────────── SECTION 4 ── -->
<div class="section">
  <h2><span class="num">04</span> FTP vs SFTP — Comparison</h2>

  <table class="cmp-table">
    <thead>
      <tr>
        <th>Property</th>
        <th class="ftp-col">FTP</th>
        <th class="sftp-col">SFTP</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Encryption</td><td><span class="cross">✗</span> None — plain text</td><td><span class="check">✓</span> Full AES encryption via SSH</td></tr>
      <tr><td>Credentials</td><td><span class="cross">✗</span> Username/password visible on wire</td><td><span class="check">✓</span> Protected inside SSH tunnel</td></tr>
      <tr><td>Data in transit</td><td><span class="cross">✗</span> Sniffable by anyone on the network</td><td><span class="check">✓</span> Encrypted end-to-end</td></tr>
      <tr><td>Port(s)</td><td>21 (control) + dynamic data ports</td><td>22 only (single port)</td></tr>
      <tr><td>Protocol</td><td>Standalone FTP daemon required</td><td>Built on SSH — no extra daemon needed</td></tr>
      <tr><td>Firewall friendliness</td><td><span class="cross">✗</span> Needs passive port range open</td><td><span class="check">✓</span> Single port, firewall-friendly</td></tr>
      <tr><td>Authentication options</td><td>Password only</td><td>Password <em>or</em> SSH key pairs</td></tr>
      <tr><td>Resume transfers</td><td>Partial support</td><td><span class="check">✓</span> Native support</td></tr>
      <tr><td>Setup overhead</td><td>Requires extra package + config</td><td><span class="check">✓</span> Already available if SSH is running</td></tr>
    </tbody>
  </table>

  <div class="success-box">
    <strong>Bottom line:</strong> SFTP gives you everything FTP does — file listing, upload, download, directory navigation — plus SSH-grade encryption, key-based auth, and a single port. There is no practical reason to run FTP over a network you don't fully control.
  </div>
</div>

<!-- ─────────────────────────────────────────── SECTION 5 ── -->
<div class="section">
  <h2><span class="num">05</span> Using SFTP as a Client</h2>

  <p>If the remote machine runs SSH (port 22 open, sshd running), SFTP is already available — no extra installation on the server side.</p>

  <div class="codeblock">
    <div class="cb-header"><span class="cb-dot r"></span><span class="cb-dot y"></span><span class="cb-dot g"></span><span class="cb-label">bash</span></div>
    <pre><span class="cm"># Connect with password auth</span>
<span class="ck">sftp</span> ftpuser@192.168.1.10

<span class="cm"># Connect with SSH key</span>
<span class="ck">sftp</span> -i ~/.ssh/id_ed25519 ftpuser@192.168.1.10

<span class="cm"># Connect on a non-standard SSH port</span>
<span class="ck">sftp</span> -P 2222 ftpuser@192.168.1.10</pre>
  </div>

  <p>Once connected, the SFTP prompt accepts the same navigation commands as FTP. Key differences:</p>

  <div class="codeblock">
    <div class="cb-header"><span class="cb-dot r"></span><span class="cb-dot y"></span><span class="cb-dot g"></span><span class="cb-label">sftp session</span></div>
    <pre>sftp&gt; <span class="ck">ls</span>                  <span class="cm"># list remote</span>
sftp&gt; <span class="ck">lls</span>                 <span class="cm"># list local (prefix l = local)</span>
sftp&gt; <span class="ck">cd</span> /remote/path
sftp&gt; <span class="ck">lcd</span> ~/local/path
sftp&gt; <span class="ck">get</span> report.pdf      <span class="cm"># download</span>
sftp&gt; <span class="ck">put</span> data.csv        <span class="cm"># upload</span>
sftp&gt; <span class="ck">get -r</span> ./docs       <span class="cm"># recursive download of a folder</span>
sftp&gt; <span class="ck">bye</span></pre>
  </div>

  <div class="info-box"><strong>No binary/ascii modes.</strong> SFTP always transfers bytes as-is — there's no text mode or line-ending translation. This is the correct default behavior for every file type.</div>
</div>

<!-- ─────────────────────────────────────────── SECTION 6 ── -->
<div class="section">
  <h2><span class="num">06</span> Setting Up SFTP on the Server (Short Version)</h2>

  <p>If OpenSSH is already installed, you're almost done. The only thing you might want is a chroot jail to restrict SFTP users to a specific directory — without giving them full shell access.</p>

  <div class="codeblock">
    <div class="cb-header"><span class="cb-dot r"></span><span class="cb-dot y"></span><span class="cb-dot g"></span><span class="cb-label">bash</span></div>
    <pre><span class="cm"># Create the SFTP group and user</span>
<span class="ck">sudo</span> groupadd sftpusers
<span class="ck">sudo</span> useradd -m -G sftpusers -s /usr/sbin/nologin sftpuser
<span class="ck">sudo</span> passwd sftpuser

<span class="cm"># Chroot jail — root must own the home dir</span>
<span class="ck">sudo</span> chown root:root /home/sftpuser
<span class="ck">sudo</span> chmod 755 /home/sftpuser

<span class="cm"># Writable upload directory</span>
<span class="ck">sudo</span> mkdir /home/sftpuser/files
<span class="ck">sudo</span> chown sftpuser:sftpuser /home/sftpuser/files</pre>
  </div>

  <p>Append this block to <code>/etc/ssh/sshd_config</code>:</p>

  <div class="codeblock">
    <div class="cb-header"><span class="cb-dot r"></span><span class="cb-dot y"></span><span class="cb-dot g"></span><span class="cb-label">/etc/ssh/sshd_config — append</span></div>
    <pre><span class="cm"># ── SFTP chroot config ─────────────────────</span>
<span class="ck">Match</span> Group sftpusers
    <span class="ck">ChrootDirectory</span>        <span class="cc">%h</span>
    <span class="ck">ForceCommand</span>           internal-sftp
    <span class="ck">AllowTcpForwarding</span>     <span class="cr">no</span>
    <span class="ck">X11Forwarding</span>          <span class="cr">no</span></pre>
  </div>

  <div class="codeblock">
    <div class="cb-header"><span class="cb-dot r"></span><span class="cb-dot y"></span><span class="cb-dot g"></span><span class="cb-label">bash</span></div>
    <pre><span class="cm"># Apply the config</span>
<span class="ck">sudo</span> sshd -t                  <span class="cm"># test for syntax errors first</span>
<span class="ck">sudo</span> systemctl restart sshd</pre>
  </div>

  <div class="success-box">
    Users in the <code>sftpusers</code> group can now connect via SFTP, are jailed to their home directory, and cannot start a shell session. SSH key-based auth works out of the box — add their public key to <code>~/.ssh/authorized_keys</code> as usual.
  </div>
</div>

<hr>
<p style="font-size:12px;color:var(--muted);text-align:center">vsftpd · OpenSSH · Linux — Field Manual</p>

</body>
</html>