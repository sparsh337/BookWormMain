var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

app.UseCors("AllowLocalhost");

// Define the Terms and Conditions content
var termsContent = new
{
    Title = "Terms of Service",
    LastUpdated = DateTime.UtcNow.ToString("MMMM dd, yyyy"),
    Content = @"
1. ACCEPTANCE OF TERMS
By accessing and using this platform, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this platform's particular services, you shall be subject to any posted guidelines or rules applicable to such services.

2. PROVISION OF SERVICES
We reserve the right to modify or discontinue, temporarily or permanently, the services (or any part thereof) with or without notice. You agree that we shall not be liable to you or to any third party for any modification, suspension or discontinuance of the services.

3. INTELLECTUAL PROPERTY
All content included on this site, such as text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the property of BookWorm or its content suppliers and protected by international copyright laws.

4. USER CONDUCT
You agree to use the site only for lawful purposes. You are prohibited from posting on or transmitting through the site any unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, sexually explicit, profane, hateful, racially, ethnically, or otherwise objectionable material of any kind.

5. PRIVACY POLICY
Your use of the site is also subject to our Privacy Policy. Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices.

6. LIMITATION OF LIABILITY
In no event shall BookWorm be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data or other intangible losses.

7. TERMINATION
We reserve the right to terminate your access to the Site, without any advance notice."
};

// GET /api/terms (Json data)
app.MapGet("/api/terms", () => Results.Json(termsContent))
   .WithName("GetTerms");

// GET /terms-page (HTML Page)
app.MapGet("/terms-page", () => 
{
    var html = $@"
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Terms of Service - {termsContent.Title}</title>
    <style>
        :root {{
            --primary: #4f46e5;
            --primary-hover: #4338ca;
            --bg-color: #f3f4f6;
            --card-bg: #ffffff;
            --text-main: #111827;
            --text-muted: #6b7280;
            --border: #e5e7eb;
        }}
        body {{ 
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            background-color: var(--bg-color);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
            color: var(--text-main);
        }}
        .card {{
            background: var(--card-bg);
            border-radius: 16px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            max-width: 650px;
            width: 100%;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            animation: fadeIn 0.5s ease-out;
        }}
        .header {{
            padding: 2rem 2rem 1rem;
            border-bottom: 1px solid var(--border);
        }}
        h1 {{
            margin: 0;
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text-main);
        }}
        .subtitle {{
            margin-top: 0.5rem;
            color: var(--text-muted);
            font-size: 0.875rem;
        }}
        .content-area {{
            padding: 2rem;
            max-height: 60vh;
            overflow-y: auto;
            line-height: 1.6;
            font-size: 0.95rem;
            color: #374151;
            scroll-behavior: smooth;
        }}
        .content-area::-webkit-scrollbar {{
            width: 8px;
        }}
        .content-area::-webkit-scrollbar-track {{
            background: #f1f1f1;
        }}
        .content-area::-webkit-scrollbar-thumb {{
            background: #c1c1c1;
            border-radius: 4px;
        }}
        .content-area::-webkit-scrollbar-thumb:hover {{
            background: #a8a8a8;
        }}
        .footer {{
            padding: 1.5rem 2rem;
            background: #fafafa;
            border-top: 1px solid var(--border);
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }}
        .checkbox-wrapper {{
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 0.9rem;
            cursor: pointer;
            user-select: none;
        }}
        .checkbox-wrapper input {{
            width: 1rem;
            height: 1rem;
            cursor: pointer;
            accent-color: var(--primary);
        }}
        button {{
            background-color: var(--primary);
            color: white;
            border: none;
            padding: 0.875rem;
            font-size: 1rem;
            font-weight: 600;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
            width: 100%;
            opacity: 0.5;
            pointer-events: none;
        }}
        button.active {{
            opacity: 1;
            pointer-events: auto;
            box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);
        }}
        button.active:hover {{
            background-color: var(--primary-hover);
            transform: translateY(-1px);
        }}
        @keyframes fadeIn {{
            from {{ opacity: 0; transform: translateY(10px); }}
            to {{ opacity: 1; transform: translateY(0); }}
        }}
        h2 {{ font-size: 1.1rem; margin-top: 1.5rem; margin-bottom: 0.5rem; color: #1f2937; }}
        p {{ margin-bottom: 1rem; }}
    </style>
</head>
<body>
    <div class='card'>
        <div class='header'>
            <h1>{termsContent.Title}</h1>
            <div class='subtitle'>Last Updated: {termsContent.LastUpdated}</div>
        </div>
        
        <div class='content-area'>
            {termsContent.Content.Replace("\n", "<br/>")}
        </div>

        <div class='footer'>
            <label class='checkbox-wrapper'>
                <input type='checkbox' id='accept-check' onchange='toggleButton()'>
                I have read and agree to the Terms of Service
            </label>
            <button id='accept-btn' onclick='acceptTerms()'>Accept & Continue</button>
        </div>
    </div>

    <script>
        function toggleButton() {{
            const check = document.getElementById('accept-check');
            const btn = document.getElementById('accept-btn');
            if (check.checked) {{
                btn.classList.add('active');
            }} else {{
                btn.classList.remove('active');
            }}
        }}

        function acceptTerms() {{
            localStorage.setItem('termsAccepted', 'true');
            window.location.href = 'http://localhost:5173?accepted=true';
        }}
    </script>
</body>
</html>";
    return Results.Content(html, "text/html");
});

app.Run("http://localhost:5001");
