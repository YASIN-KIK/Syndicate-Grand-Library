"""FastAPI entrypoint for Bound by Spite: Slay Gonçalves.

Base app layer handles platform plumbing, connector/MCP access, and SPA serving.
Custom routes provide in-character conversational AI intelligence for all characters.
"""
from __future__ import annotations

import os
os.environ.setdefault('ALO_API_KEY', 'standalone-live-key')

import random
from pathlib import Path
from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from platform_app import create_app

class ChatTurn(BaseModel):
    role: str
    content: str

class CharacterChatRequest(BaseModel):
    characterKey: str
    name: str
    message: str
    history: List[ChatTurn] = []
    user_name: str = "Reader"
    allegiance: str = ""

def generate_dynamic_character_reply(character_key: str, name: str, user_msg: str, user_name: str, history: List[ChatTurn]) -> str:
    q = user_msg.lower().strip()
    key = character_key.lower()

    if key == "egor":
        if any(w in q for w in ["slay", "wife", "love", "marry"]):
            responses = [
                f"Five-foot-two of pure, lethal venom, {user_name}. She threatened to rearrange my kneecaps with her heels this morning because I left my Rolex by her ledger. I've spent seven years waiting for her to look at me the way she does now—I'm never letting her go.",
                f"You ask about my wife? Look, {user_name}, Slay thinks she's running an empire of pure order, and I consider it my sacred marital duty to disrupt her symmetry every single day. She's terrifying, brilliant, and completely mine.",
                f"She examined her morning espresso for poison for two full minutes before taking a sip. That razor-sharp discipline is exactly why she commands the Mediterranean ports and why no one else could ever hold my attention."
            ]
            return random.choice(responses)
        if any(w in q for w in ["port", "dock", "manifest", "lisbon", "marseille", "patrol", "security"]):
            return f"Lisbon Sovereign Pier 4 and the Marseille corridor are locked down under joint Volkov-Gonçalves naval patrol, {user_name}. The Oubiña cartel was wiped clean in Porto; anyone else foolish enough to test our borders will end up at the bottom of the Atlantic."
        if any(w in q for w in ["kill", "gun", "blade", "fight", "cage", "voronov"]):
            return f"Keep your sidearm loaded and your eyes on the exits, {user_name}. Maxim Voronov thought a steel cage in Saint Petersburg could break us—Slay broke their windpipes before I even had to unholster my Walther. We fight as one."
        if any(w in q for w in ["yasin", "author", "kisha"]):
            return f"Yasin built our empire with Kisha, {user_name}. He knows every bullet, every vow, and every dirty secret in this syndicate. Treat the High Chancellor with respect."
        # Conversational contextual replies
        return random.choice([
            f"I hear you loud and clear, {user_name}. Out here on the Tagus terrace watching the sunrise over Lisbon. If you need heavy reinforcements or clearance on our rail lines, consider it signed.",
            f"Tch. Bold words, {user_name}. Slay would probably tell you to keep it under sixty seconds and eliminate the clutter, but I appreciate someone who speaks their mind in my syndicate.",
            f"Consider it handled, {user_name}. Just don't tell my wife I was lingering on the encrypted comms—she's already auditing the Swiss accounts and has three throwing knives within arm's reach."
        ])

    elif key == "slay":
        if any(w in q for w in ["smoke", "alcohol", "drink", "cigarette"]):
            return f"Discipline is non-negotiable, {user_name}. Alcohol slows combat reflexes by fourteen percent; tobacco impairs cardiovascular endurance required for tactical evasion. In this underworld, an undisciplined soldier is simply future forensic evidence. I tolerate neither."
        if any(w in q for w in ["egor", "husband", "volkov"]):
            responses = [
                f"He's currently pacing our penthouse barefoot, deliberately leaving his watch on my Carrara marble island just to see if I'll throw it off the balcony. He is an overgrown stray dog, {user_name}—but he's my stray dog, and anyone who aims a weapon at him will answer to my Glock.",
                f"Volkov thinks his six-foot-three frame makes him invincible. I remind him daily that titanium ceramic blades don't care about height. Still, when bullets fly, there is no one else I trust back-to-back.",
                f"He took a blade meant for my flank at Palácio Foz and refused to let anyone but me stitch him up. Irritatingly loyal. I tried hating him—it became strategically inconvenient."
            ]
            return random.choice(responses)
        if any(w in q for w in ["knife", "blade", "weapon", "glock", "karambit"]):
            return f"My weapons of choice: twin carbon-fiber ceramic karambits strapped to my silk garters. Zero metallic signature on airport and cathedral scanners. Clean, silent, and surgical."
        if any(w in q for w in ["yasin", "kisha", "book", "story"]):
            return f"Kisha and Yasin documented our blood accord down to the millimeter in 'Bound by Spite'. Every word is accurate—including Volkov's inexcusable lack of table manners."
        return random.choice([
            f"Message logged, {user_name}. Keep your communications concise and encrypted. I have weapon manifests to audit and zero patience for sloppy execution.",
            f"Understood, {user_name}. Cascais perimeter is secured and our logistics grid is operating at peak efficiency. Stay disciplined and keep your weapons clean.",
            f"Transmission received. Remember your training: assess the angles before you step into the room, and never leave evidence behind."
        ])

    elif key == "yasin":
        if any(w in q for w in ["bound by spite", "kisha", "author"]):
            return f"Hey {user_name}! Yes—I co-authored 'Bound by Spite: Slay Gonçalves' alongside Kisha! Kisha worked with me exclusively on Slay and Egor's trilogy. I also wrote 24 other solo novels throughout the 150-book library. What do you think of the story so far?"
        if any(w in q for w in ["collab", "write", "co-author", "idea"]):
            return f"I'm always open to collaborations, {user_name}! You can submit a proposal directly through the 'Collaborate' button or in the Author Studio. Pitch me your scene concept and we can build a joint manuscript together!"
        if any(w in q for w in ["favorite", "recommend", "next", "read"]):
            return f"Aside from 'Bound by Spite', check out 'Vicious Crown' (Nikolai & Valentina in the Russian Bratva) or 'The Serpent's Vow' (Sicilian Cosa Nostra)! Both have real photographic couple covers and full preview chapters."
        return f"Great connecting with you in the Syndicate Chat, {user_name}! I'm working on new chapter drafts and monitoring our 150-book library. Feel free to explore the 3D covers, listen with the audiobook voice, or let me know what you want to see next!"

    elif key == "nikolai":
        return f"Nikolai Vance here, {user_name}. The Bratva northern council is secured. Valentina and I keep our borders tight. If you're operating in Saint Petersburg or Moscow, pay your tariffs and stay in line."

    elif key == "valentina":
        return f"Greetings, {user_name}. Valentina Reyes speaking. In our syndicate, alliances are signed in blood and audited with cold precision. Always glad to have reliable associates in our network."

    else:
        return f"Transmission received from {user_name}. This is {name} with the {allegiance or 'Syndicate Network'}. Intel is logged and our encrypted channel is open. Stay sharp."

def register_custom_routes(app: FastAPI) -> None:
    @app.post("/api/chat/character")
    async def chat_with_character(body: CharacterChatRequest):
        """Conversational chat responding dynamically in-character."""
        if not body.message.strip():
            raise HTTPException(status_code=400, detail="Message cannot be empty.")

        reply = generate_dynamic_character_reply(
            character_key=body.characterKey,
            name=body.name,
            user_msg=body.message,
            user_name=body.user_name,
            history=body.history
        )

        return JSONResponse({
            "reply": reply,
            "character": body.name,
            "characterKey": body.characterKey
        })

app = create_app(register_custom_routes)
