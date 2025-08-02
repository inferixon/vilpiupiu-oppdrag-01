@namespace
class SpriteKind:
    MineHoming = SpriteKind.create()
    Weapon1 = SpriteKind.create()
    wallside = SpriteKind.create()
    wallbtm = SpriteKind.create()
    ContWeapon = SpriteKind.create()
    Blast = SpriteKind.create()
    Explosion = SpriteKind.create()
    ContShield = SpriteKind.create()
    Asteroid = SpriteKind.create()
    MineStatic = SpriteKind.create()
    Turrel = SpriteKind.create()
    PlasmaShot = SpriteKind.create()
    Shield = SpriteKind.create()
    Weapon2 = SpriteKind.create()
    Splash = SpriteKind.create()
@namespace
class StatusBarKind:
    Shield_1 = StatusBarKind.create()
    Shield_2 = StatusBarKind.create()

def on_on_overlap(sprite, otherSprite):
    sprites.destroy(sprite)
    doExplosion(otherSprite)
sprites.on_overlap(SpriteKind.Weapon1, SpriteKind.ContWeapon, on_on_overlap)

def turrelBlastShot():
    global turrelBlast
    if turrelBot.x > 0:
        music.play(music.create_sound_effect(WaveShape.SAWTOOTH,
                1,
                1489,
                255,
                0,
                396,
                SoundExpressionEffect.WARBLE,
                InterpolationCurve.LOGARITHMIC),
            music.PlaybackMode.IN_BACKGROUND)
        turrelBlast = sprites.create(assets.image("""
            turrelBlast
            """), SpriteKind.Blast)
        turrelBlast.set_position(turrelBot.x, turrelBot.y)
        turrelBlast.z += -5
        animation.run_image_animation(turrelBlast,
            assets.animation("""
                turrelBlast
                """),
            200,
            True)
        turrelBlast.set_flag(SpriteFlag.AUTO_DESTROY, True)
        if gamemp == 1:
            turrelBlast.follow(jet1, 22)
        if gamemp == 2:
            turrelBlast.follow(jet2, 22)
        if gamemp == 3:
            if abs(turrelBlast.x - jet1.x) < abs(turrelBlast.x - jet2.x):
                turrelBlast.follow(jet1, 12)
            else:
                turrelBlast.follow(jet2, 12)
        sprites.destroy(turrelBot, effects.fire, 500)
def doStartGame():
    global statusbar1, statusbar2, gamescreen
    scene.set_background_image(assets.image("""
        splash-3
        """))
    sprites.destroy_all_sprites_of_kind(SpriteKind.Splash)
    sprites.destroy_all_sprites_of_kind(SpriteKind.text)
    if gamemp == 1:
        info.player1.set_score(0)
        info.player2.set_score(0)
        statusbar1 = statusbars.create(20, 2, StatusBarKind.Shield_1)
        statusbar1.set_color(8, 2)
        statusbar1.position_direction(CollisionDirection.TOP)
        statusbar1.set_offset_padding(-30, 0)
        statusbar2 = statusbars.create(20, 2, StatusBarKind.Shield_2)
        statusbar2.set_color(8, 2)
        statusbar2.position_direction(CollisionDirection.TOP)
        statusbar2.set_offset_padding(30, -5)
        gamescreen = 3
        spawnJet1()
    if gamemp == 3:
        info.player1.set_score(0)
        info.player2.set_score(0)
        statusbar1 = statusbars.create(20, 2, StatusBarKind.Shield_1)
        statusbar1.set_color(8, 2)
        statusbar1.position_direction(CollisionDirection.TOP)
        statusbar1.set_offset_padding(-30, 0)
        statusbar2 = statusbars.create(20, 2, StatusBarKind.Shield_2)
        statusbar2.set_color(8, 2)
        statusbar2.position_direction(CollisionDirection.TOP)
        statusbar2.set_offset_padding(30, 0)
        gamescreen = 3
        spawnJet1()
        spawnJet2()

def on_on_overlap2(sprite21, otherSprite19):
    sprites.destroy(sprite21)
    doExplosion(otherSprite19)
sprites.on_overlap(SpriteKind.Blast, SpriteKind.ContShield, on_on_overlap2)

def on_player2_button_b_pressed():
    global gamemp
    # game.reset()
    if gamescreen == 3:
        pass
    else:
        if gamescreen == 2:
            doStartGame()
        if gamescreen == 1:
            gamemp = 3
            doShowTips()
controller.player2.on_button_event(ControllerButton.B,
    ControllerButtonEvent.PRESSED,
    on_player2_button_b_pressed)

def on_on_overlap3(sprite27, otherSprite25):
    sprites.destroy(sprite27)
    doExplosion(otherSprite25)
sprites.on_overlap(SpriteKind.Weapon1, SpriteKind.ContShield, on_on_overlap3)

def jetShot2(num: number):
    global railgun, laser, plasma, plasmasideleft45, plasmasideright45, plasmasideright90, plasmasideleft90
    # cannon
    if num == 1:
        railgun = sprites.create(assets.image("""
            cannon
            """), SpriteKind.Weapon2)
        railgun.set_position(jet2.x - 0, jet2.y - 14)
        railgun.set_velocity(0, -33)
        railgun.set_flag(SpriteFlag.AUTO_DESTROY, True)
        music.play(music.create_sound_effect(WaveShape.NOISE,
                3419,
                1,
                255,
                0,
                107,
                SoundExpressionEffect.TREMOLO,
                InterpolationCurve.CURVE),
            music.PlaybackMode.IN_BACKGROUND)
    # cannon
    if num == 2:
        railgun = sprites.create(assets.image("""
            vulkan
            """), SpriteKind.Weapon2)
        railgun.set_position(jet2.x - 0, jet2.y - 13)
        railgun.set_velocity(0, -55)
        railgun.set_flag(SpriteFlag.AUTO_DESTROY, True)
        music.play(music.create_sound_effect(WaveShape.NOISE,
                4211,
                1,
                255,
                0,
                104,
                SoundExpressionEffect.TREMOLO,
                InterpolationCurve.LINEAR),
            music.PlaybackMode.IN_BACKGROUND)
    if num == 3:
        laser = sprites.create(assets.image("""
                lasershot-1x
                """),
            SpriteKind.Weapon2)
        laser.set_position(jet2.x - 0, jet2.y - 10)
        laser.set_velocity(0, -222)
        laser.set_flag(SpriteFlag.AUTO_DESTROY, True)
        music.play(music.create_sound_effect(WaveShape.TRIANGLE,
                1181,
                137,
                255,
                0,
                320,
                SoundExpressionEffect.TREMOLO,
                InterpolationCurve.CURVE),
            music.PlaybackMode.IN_BACKGROUND)
    if num == 4:
        laser = sprites.create(assets.image("""
                lasershot-2x
                """),
            SpriteKind.Weapon2)
        laser.set_position(jet2.x - 0, jet2.y - 8)
        laser.set_velocity(0, -222)
        laser.set_flag(SpriteFlag.AUTO_DESTROY, True)
        music.play(music.create_sound_effect(WaveShape.TRIANGLE,
                1288,
                137,
                255,
                0,
                320,
                SoundExpressionEffect.TREMOLO,
                InterpolationCurve.CURVE),
            music.PlaybackMode.IN_BACKGROUND)
    if num == 5:
        plasma = sprites.create(assets.image("""
                plasmashot-2x
                """),
            SpriteKind.Weapon2)
        plasma.set_position(jet2.x - 0, jet2.y - 12)
        plasma.set_velocity(0, -111)
        plasma.set_flag(SpriteFlag.AUTO_DESTROY, True)
        music.play(music.create_sound_effect(WaveShape.SAWTOOTH,
                878,
                499,
                255,
                0,
                557,
                SoundExpressionEffect.WARBLE,
                InterpolationCurve.LINEAR),
            music.PlaybackMode.IN_BACKGROUND)
    if num == 6:
        plasma = sprites.create(assets.image("""
                plasmashot-3x
                """),
            SpriteKind.Weapon2)
        plasma.set_position(jet2.x - 0, jet2.y - 12)
        plasma.set_velocity(0, -111)
        plasma.set_flag(SpriteFlag.AUTO_DESTROY, True)
        music.play(music.create_sound_effect(WaveShape.SAWTOOTH,
                1199,
                499,
                255,
                0,
                557,
                SoundExpressionEffect.WARBLE,
                InterpolationCurve.LINEAR),
            music.PlaybackMode.IN_BACKGROUND)
    if num == 7:
        plasma = sprites.create(assets.image("""
                phusionshot-3x
                """),
            SpriteKind.Weapon2)
        plasma.set_position(jet2.x - 0, jet2.y - 12)
        plasma.set_velocity(0, -144)
        plasmasideleft45 = sprites.create(assets.image("""
                side-left-45
                """),
            SpriteKind.Weapon2)
        plasmasideleft45.set_position(jet2.x - 1, jet2.y - 2)
        plasmasideleft45.set_velocity(-77, -144)
        plasmasideright45 = sprites.create(assets.image("""
                side-right-45
                """),
            SpriteKind.Weapon2)
        plasmasideright45.set_position(jet2.x + 1, jet2.y - 2)
        plasmasideright45.set_velocity(77, -144)
        plasma.set_flag(SpriteFlag.AUTO_DESTROY, True)
        plasmasideleft45.set_flag(SpriteFlag.AUTO_DESTROY, True)
        plasmasideright45.set_flag(SpriteFlag.AUTO_DESTROY, True)
        music.play(music.create_sound_effect(WaveShape.SAWTOOTH,
                1244,
                499,
                255,
                0,
                557,
                SoundExpressionEffect.VIBRATO,
                InterpolationCurve.LINEAR),
            music.PlaybackMode.IN_BACKGROUND)
    if num == 8:
        plasma = sprites.create(assets.image("""
                phusionshot-3x
                """),
            SpriteKind.Weapon2)
        plasma.set_position(jet2.x - 0, jet2.y - 12)
        plasma.set_velocity(0, -144)
        plasmasideleft45 = sprites.create(assets.image("""
                side-left-45
                """),
            SpriteKind.Weapon2)
        plasmasideleft45.set_position(jet2.x - 1, jet2.y - 2)
        plasmasideleft45.set_velocity(-77, -144)
        plasmasideright45 = sprites.create(assets.image("""
                side-right-45
                """),
            SpriteKind.Weapon2)
        plasmasideright45.set_position(jet2.x + 1, jet2.y - 2)
        plasmasideright45.set_velocity(77, -144)
        plasmasideright90 = sprites.create(assets.image("""
                side-right-90
                """),
            SpriteKind.Weapon2)
        plasmasideright90.set_position(jet2.x + 0, jet2.y - 7)
        plasmasideright90.set_velocity(144, 0)
        plasmasideleft90 = sprites.create(assets.image("""
                side-left-90
                """),
            SpriteKind.Weapon2)
        plasmasideleft90.set_position(jet2.x - 0, jet2.y - 7)
        plasmasideleft90.set_velocity(-144, 0)
        plasma.set_flag(SpriteFlag.AUTO_DESTROY, True)
        plasmasideleft45.set_flag(SpriteFlag.AUTO_DESTROY, True)
        plasmasideright45.set_flag(SpriteFlag.AUTO_DESTROY, True)
        plasmasideleft90.set_flag(SpriteFlag.AUTO_DESTROY, True)
        plasmasideright90.set_flag(SpriteFlag.AUTO_DESTROY, True)
        music.play(music.create_sound_effect(WaveShape.SAWTOOTH,
                1645,
                499,
                255,
                0,
                557,
                SoundExpressionEffect.VIBRATO,
                InterpolationCurve.LINEAR),
            music.PlaybackMode.IN_BACKGROUND)
def spawnMineHoming():
    global mineHoming
    mineHoming = sprites.create(assets.image("""
        bomb
        """), SpriteKind.MineHoming)
    mineHoming.set_position(randint(0, scene.screen_width()), 0)
    mineHoming.set_velocity(randint(-4, 4), randint(12, 20))
    mineHoming.z += -5
    animation.run_image_animation(mineHoming,
        assets.animation("""
            mine-homing
            """),
        333,
        True)
    mineHoming.set_flag(SpriteFlag.AUTO_DESTROY, True)
    if gamemp == 1:
        mineHoming.follow(jet1, 24)
    if gamemp == 2:
        mineHoming.follow(jet2, 24)
    if gamemp == 3:
        if abs(mineHoming.x - jet1.x) < abs(mineHoming.x - jet2.x):
            mineHoming.follow(jet1, 24)
        else:
            mineHoming.follow(jet2, 24)

def on_on_overlap4(sprite26, otherSprite24):
    sprites.destroy(sprite26)
    doExplosion(otherSprite24)
    info.player2.change_score_by(1)
sprites.on_overlap(SpriteKind.Weapon2, SpriteKind.Asteroid, on_on_overlap4)

def on_on_overlap5(sprite30, otherSprite28):
    otherSprite28.y += randint(-15, -25)
    otherSprite28.x += randint(-10, 10)
sprites.on_overlap(SpriteKind.Weapon1, SpriteKind.Blast, on_on_overlap5)

def showSplash1():
    global splash1title, splash12, splash1btnRed, splash14, splash1btnBlue
    scene.set_background_image(assets.image("""
        splash1bg
        """))
    sprites.destroy_all_sprites_of_kind(SpriteKind.Splash)
    splash1title = sprites.create(assets.image("""
            splash1title3
            """),
        SpriteKind.Splash)
    splash1title.set_scale(0.9, ScaleAnchor.MIDDLE)
    splash1title.set_position(80, 33)
    splash12 = textsprite.create("1 PLAYER", 15, 2)
    splash12.set_max_font_height(10)
    splash12.set_position(65, 67)
    splash1btnRed = sprites.create(assets.image("""
        btnRed
        """), SpriteKind.Splash)
    splash1btnRed.set_position(140, 67)
    splash14 = textsprite.create("2 PLAYERS", 15, 8)
    splash14.set_max_font_height(10)
    splash14.set_position(67, 90)
    splash1btnBlue = sprites.create(assets.image("""
        btnBlue
        """), SpriteKind.Splash)
    splash1btnBlue.set_position(140, 90)

def on_on_overlap6(sprite15, otherSprite14):
    sprites.destroy(sprite15)
    doExplosion(otherSprite14)
sprites.on_overlap(SpriteKind.Blast, SpriteKind.ContWeapon, on_on_overlap6)

def doExplosion(expsprite: Sprite):
    global explosion
    music.play(music.create_sound_effect(WaveShape.NOISE,
            1,
            1534,
            255,
            0,
            150,
            SoundExpressionEffect.VIBRATO,
            InterpolationCurve.LINEAR),
        music.PlaybackMode.IN_BACKGROUND)
    explosion = sprites.create(assets.image("""
            explosion-place
            """),
        SpriteKind.Explosion)
    explosion.set_position(expsprite.x, expsprite.y)
    explosion.set_velocity(expsprite.vx, expsprite.vy)
    explosion.z = 1
    explosion.set_flag(SpriteFlag.AUTO_DESTROY, True)
    animation.run_image_animation(explosion,
        assets.animation("""
            explosion
            """),
        100,
        False)
    pause(150)
    sprites.destroy(expsprite)

def on_on_overlap7(sprite28, otherSprite26):
    sprites.destroy(sprite28)
    doExplosion(otherSprite26)
sprites.on_overlap(SpriteKind.Weapon2, SpriteKind.ContWeapon, on_on_overlap7)

def on_on_destroyed(sprite3):
    global turrels
    turrels += -1
sprites.on_destroyed(SpriteKind.Turrel, on_on_destroyed)

def spawnJet2():
    global jet2
    jet2 = sprites.create(assets.image("""
        jet-2
        """), SpriteKind.player)
    jet2.set_position(scene.screen_width() / 2 + 30, scene.screen_height() * 0.8)
    jet2.set_stay_in_screen(True)
    controller.player2.move_sprite(jet2, 100, 30)
    statusbar2.value = 100

def on_player2_button_a_pressed():
    global gamemp
    if gamescreen == 3:
        if not (gamemp == 1):
            jetShot2(weaponType2)
    if gamescreen == 2:
        doStartGame()
    if gamescreen == 1:
        gamemp = 1
        doShowTips()
controller.player2.on_button_event(ControllerButton.A,
    ControllerButtonEvent.PRESSED,
    on_player2_button_a_pressed)

def doShowTips():
    global gamescreen, splash21, splash23, splash24, splash25, splash26
    gamescreen = 2
    sprites.destroy_all_sprites_of_kind(SpriteKind.Splash)
    sprites.destroy_all_sprites_of_kind(SpriteKind.text)
    scene.set_background_image(assets.image("""
        splash1bg
        """))
    splash21 = textsprite.create("RED button to FIRE", 15, 2)
    splash21.set_max_font_height(8)
    splash21.set_position(80, 25)
    # splash22 = textsprite.create("BLUE button to RESET game", 15, 8)
    # splash22.setMaxFontHeight(8)
    # splash22.setPosition(80, 40)
    splash23 = textsprite.create("Collect containers", 15, 9)
    splash23.set_max_font_height(9)
    splash23.set_position(80, 50)
    splash24 = textsprite.create("to refill your shield", 15, 9)
    splash24.set_max_font_height(9)
    splash24.set_position(80, 60)
    splash25 = textsprite.create("and upgrade your weapons", 15, 9)
    splash25.set_max_font_height(9)
    splash25.set_position(80, 70)
    splash26 = textsprite.create("Press ANY to START", 15, 1)
    splash26.set_max_font_height(9)
    splash26.set_position(80, 95)

def on_on_overlap8(sprite7, otherSprite6):
    sprites.destroy(sprite7)
    doExplosion(otherSprite6)
    info.player1.change_score_by(5)
sprites.on_overlap(SpriteKind.Weapon1, SpriteKind.MineHoming, on_on_overlap8)

def on_on_overlap9(sprite4, otherSprite3):
    sprites.destroy(sprite4)
    doExplosion(otherSprite3)
sprites.on_overlap(SpriteKind.PlasmaShot, SpriteKind.MineStatic, on_on_overlap9)

def on_on_overlap10(sprite36, otherSprite34):
    sprites.destroy(sprite36)
    doExplosion(otherSprite34)
sprites.on_overlap(SpriteKind.PlasmaShot, SpriteKind.Turrel, on_on_overlap10)

def on_on_created(sprite18):
    global turrels
    turrels += 1
sprites.on_created(SpriteKind.Turrel, on_on_created)

def on_on_overlap11(sprite20, otherSprite18):
    sprites.destroy(sprite20, effects.fire, 100)
    if Math.percent_chance(50):
        doExplosion(otherSprite18)
        info.player1.change_score_by(7)
sprites.on_overlap(SpriteKind.Weapon1, SpriteKind.Turrel, on_on_overlap11)

def on_on_overlap12(sprite19, otherSprite17):
    sprites.destroy(sprite19)
    doExplosion(otherSprite17)
sprites.on_overlap(SpriteKind.Weapon2, SpriteKind.ContShield, on_on_overlap12)

def jetShot1(num2: number):
    global railgun, laser, plasma, plasmasideleft45, plasmasideright45, plasmasideright90, plasmasideleft90
    # cannon
    if num2 == 1:
        railgun = sprites.create(assets.image("""
            cannon
            """), SpriteKind.Weapon1)
        railgun.set_position(jet1.x - 0, jet1.y - 14)
        railgun.set_velocity(0, -33)
        railgun.set_flag(SpriteFlag.AUTO_DESTROY, True)
        music.play(music.create_sound_effect(WaveShape.NOISE,
                3419,
                1,
                255,
                0,
                107,
                SoundExpressionEffect.TREMOLO,
                InterpolationCurve.CURVE),
            music.PlaybackMode.IN_BACKGROUND)
    # cannon
    if num2 == 2:
        railgun = sprites.create(assets.image("""
            vulkan
            """), SpriteKind.Weapon1)
        railgun.set_position(jet1.x - 0, jet1.y - 13)
        railgun.set_velocity(0, -55)
        railgun.set_flag(SpriteFlag.AUTO_DESTROY, True)
        music.play(music.create_sound_effect(WaveShape.NOISE,
                4211,
                1,
                255,
                0,
                104,
                SoundExpressionEffect.TREMOLO,
                InterpolationCurve.LINEAR),
            music.PlaybackMode.IN_BACKGROUND)
    if num2 == 3:
        laser = sprites.create(assets.image("""
                lasershot-1x
                """),
            SpriteKind.Weapon1)
        laser.set_position(jet1.x - 0, jet1.y - 10)
        laser.set_velocity(0, -222)
        laser.set_flag(SpriteFlag.AUTO_DESTROY, True)
        music.play(music.create_sound_effect(WaveShape.TRIANGLE,
                1181,
                137,
                255,
                0,
                320,
                SoundExpressionEffect.TREMOLO,
                InterpolationCurve.CURVE),
            music.PlaybackMode.IN_BACKGROUND)
    if num2 == 4:
        laser = sprites.create(assets.image("""
                lasershot-2x
                """),
            SpriteKind.Weapon1)
        laser.set_position(jet1.x - 0, jet1.y - 8)
        laser.set_velocity(0, -222)
        laser.set_flag(SpriteFlag.AUTO_DESTROY, True)
        music.play(music.create_sound_effect(WaveShape.TRIANGLE,
                1288,
                137,
                255,
                0,
                320,
                SoundExpressionEffect.TREMOLO,
                InterpolationCurve.CURVE),
            music.PlaybackMode.IN_BACKGROUND)
    if num2 == 5:
        plasma = sprites.create(assets.image("""
                plasmashot-2x
                """),
            SpriteKind.Weapon1)
        plasma.set_position(jet1.x - 0, jet1.y - 12)
        plasma.set_velocity(0, -111)
        plasma.set_flag(SpriteFlag.AUTO_DESTROY, True)
        music.play(music.create_sound_effect(WaveShape.SAWTOOTH,
                878,
                499,
                255,
                0,
                557,
                SoundExpressionEffect.WARBLE,
                InterpolationCurve.LINEAR),
            music.PlaybackMode.IN_BACKGROUND)
    if num2 == 6:
        plasma = sprites.create(assets.image("""
                plasmashot-3x
                """),
            SpriteKind.Weapon1)
        plasma.set_position(jet1.x - 0, jet1.y - 12)
        plasma.set_velocity(0, -111)
        plasma.set_flag(SpriteFlag.AUTO_DESTROY, True)
        music.play(music.create_sound_effect(WaveShape.SAWTOOTH,
                1199,
                499,
                255,
                0,
                557,
                SoundExpressionEffect.WARBLE,
                InterpolationCurve.LINEAR),
            music.PlaybackMode.IN_BACKGROUND)
    if num2 == 7:
        plasma = sprites.create(assets.image("""
                phusionshot-3x
                """),
            SpriteKind.Weapon1)
        plasma.set_position(jet1.x - 0, jet1.y - 12)
        plasma.set_velocity(0, -144)
        plasmasideleft45 = sprites.create(assets.image("""
                side-left-45
                """),
            SpriteKind.Weapon1)
        plasmasideleft45.set_position(jet1.x - 1, jet1.y - 2)
        plasmasideleft45.set_velocity(-77, -144)
        plasmasideright45 = sprites.create(assets.image("""
                side-right-45
                """),
            SpriteKind.Weapon1)
        plasmasideright45.set_position(jet1.x + 1, jet1.y - 2)
        plasmasideright45.set_velocity(77, -144)
        plasma.set_flag(SpriteFlag.AUTO_DESTROY, True)
        plasmasideleft45.set_flag(SpriteFlag.AUTO_DESTROY, True)
        plasmasideright45.set_flag(SpriteFlag.AUTO_DESTROY, True)
        music.play(music.create_sound_effect(WaveShape.SAWTOOTH,
                1244,
                499,
                255,
                0,
                557,
                SoundExpressionEffect.VIBRATO,
                InterpolationCurve.LINEAR),
            music.PlaybackMode.IN_BACKGROUND)
    if num2 == 8:
        plasma = sprites.create(assets.image("""
                phusionshot-3x
                """),
            SpriteKind.Weapon1)
        plasma.set_position(jet1.x - 0, jet1.y - 12)
        plasma.set_velocity(0, -144)
        plasmasideleft45 = sprites.create(assets.image("""
                side-left-45
                """),
            SpriteKind.Weapon1)
        plasmasideleft45.set_position(jet1.x - 1, jet1.y - 2)
        plasmasideleft45.set_velocity(-77, -144)
        plasmasideright45 = sprites.create(assets.image("""
                side-right-45
                """),
            SpriteKind.Weapon1)
        plasmasideright45.set_position(jet1.x + 1, jet1.y - 2)
        plasmasideright45.set_velocity(77, -144)
        plasmasideright90 = sprites.create(assets.image("""
                side-right-90
                """),
            SpriteKind.Weapon1)
        plasmasideright90.set_position(jet1.x + 0, jet1.y - 7)
        plasmasideright90.set_velocity(144, 0)
        plasmasideleft90 = sprites.create(assets.image("""
                side-left-90
                """),
            SpriteKind.Weapon1)
        plasmasideleft90.set_position(jet1.x - 0, jet1.y - 7)
        plasmasideleft90.set_velocity(-144, 0)
        plasma.set_flag(SpriteFlag.AUTO_DESTROY, True)
        plasmasideleft45.set_flag(SpriteFlag.AUTO_DESTROY, True)
        plasmasideright45.set_flag(SpriteFlag.AUTO_DESTROY, True)
        plasmasideleft90.set_flag(SpriteFlag.AUTO_DESTROY, True)
        plasmasideright90.set_flag(SpriteFlag.AUTO_DESTROY, True)
        music.play(music.create_sound_effect(WaveShape.SAWTOOTH,
                1645,
                499,
                255,
                0,
                557,
                SoundExpressionEffect.VIBRATO,
                InterpolationCurve.LINEAR),
            music.PlaybackMode.IN_BACKGROUND)

def on_on_overlap13(sprite22, otherSprite20):
    sprites.destroy(sprite22)
    doExplosion(otherSprite20)
sprites.on_overlap(SpriteKind.Blast, SpriteKind.MineStatic, on_on_overlap13)

def on_on_overlap14(sprite29, otherSprite27):
    otherSprite27.y += randint(-15, -25)
    otherSprite27.x += randint(-10, 10)
sprites.on_overlap(SpriteKind.Weapon2, SpriteKind.Blast, on_on_overlap14)

def on_on_overlap15(sprite16, otherSprite15):
    sprites.destroy(sprite16)
    doExplosion(otherSprite15)
sprites.on_overlap(SpriteKind.Blast, SpriteKind.Turrel, on_on_overlap15)

def spawnAsteroid(num3: number):
    global asteroid
    asteroid = sprites.create(assets.image("""
        ast-1
        """), SpriteKind.Asteroid)
    if num3 == 1:
        animation.run_image_animation(asteroid,
            assets.animation("""
                aster-1
                """),
            444,
            True)
    if num3 == 2:
        animation.run_image_animation(asteroid,
            assets.animation("""
                aster-2
                """),
            333,
            True)
    if num3 == 3:
        animation.run_image_animation(asteroid,
            assets.animation("""
                aster-3
                """),
            399,
            True)
    asteroid.set_position(randint(0, scene.screen_width()), 0)
    asteroid.set_velocity(randint(-3, 3), randint(8, 12))
    asteroid.z += -5
    asteroid.set_flag(SpriteFlag.AUTO_DESTROY, True)

def on_on_overlap16(sprite12, otherSprite11):
    sprites.destroy(sprite12)
    doExplosion(otherSprite11)
sprites.on_overlap(SpriteKind.PlasmaShot,
    SpriteKind.ContShield,
    on_on_overlap16)

def on_on_overlap17(sprite2, otherSprite2):
    sprites.destroy(sprite2)
    doExplosion(otherSprite2)
sprites.on_overlap(SpriteKind.Blast, SpriteKind.MineHoming, on_on_overlap17)

def on_on_overlap18(sprite14, otherSprite13):
    sprites.destroy(sprite14, effects.fire, 100)
    if Math.percent_chance(50):
        doExplosion(otherSprite13)
        info.player2.change_score_by(7)
sprites.on_overlap(SpriteKind.Weapon2, SpriteKind.Turrel, on_on_overlap18)

def on_on_overlap19(sprite32, otherSprite30):
    music.play(music.create_sound_effect(WaveShape.NOISE,
            1,
            147,
            99,
            0,
            404,
            SoundExpressionEffect.VIBRATO,
            InterpolationCurve.LINEAR),
        music.PlaybackMode.IN_BACKGROUND)
    sprites.destroy_all_sprites_of_kind(SpriteKind.Shield)
    if sprite32 == jet1:
        controller.player1.move_sprite(jet1, 4, 2)
        statusbar1.value += randint(-16, -8)
        doShieldImpact(sprite32)
        doExplosion(otherSprite30)
        scene.camera_shake(10, 200)
        pause(200)
        sprites.destroy_all_sprites_of_kind(SpriteKind.Shield)
        controller.player1.move_sprite(jet1, 80, 30)
    if sprite32 == jet2:
        controller.player2.move_sprite(jet2, 4, 2)
        statusbar2.value += randint(-16, -8)
        doShieldImpact(sprite32)
        doExplosion(otherSprite30)
        scene.camera_shake(10, 200)
        pause(200)
        sprites.destroy_all_sprites_of_kind(SpriteKind.Shield)
        controller.player2.move_sprite(jet2, 80, 30)
sprites.on_overlap(SpriteKind.player, SpriteKind.Blast, on_on_overlap19)

def on_on_overlap20(sprite9, otherSprite8):
    sprites.destroy(sprite9)
    doExplosion(otherSprite8)
    info.player2.change_score_by(5)
sprites.on_overlap(SpriteKind.Weapon2, SpriteKind.MineHoming, on_on_overlap20)

def on_on_overlap21(sprite34, otherSprite32):
    music.play(music.create_sound_effect(WaveShape.NOISE,
            1,
            147,
            99,
            0,
            404,
            SoundExpressionEffect.VIBRATO,
            InterpolationCurve.LINEAR),
        music.PlaybackMode.IN_BACKGROUND)
    sprites.destroy_all_sprites_of_kind(SpriteKind.Shield)
    if sprite34 == jet1:
        controller.player1.move_sprite(jet1, 4, 2)
        statusbar1.value += randint(-15, -5)
        doShieldImpact(sprite34)
        doExplosion(otherSprite32)
        scene.camera_shake(10, 200)
        pause(200)
        sprites.destroy_all_sprites_of_kind(SpriteKind.Shield)
        controller.player1.move_sprite(jet1, 80, 30)
    if sprite34 == jet1:
        controller.player2.move_sprite(jet2, 4, 2)
        statusbar2.value += randint(-15, -5)
        doShieldImpact(sprite34)
        doExplosion(otherSprite32)
        scene.camera_shake(10, 200)
        pause(200)
        sprites.destroy_all_sprites_of_kind(SpriteKind.Shield)
        controller.player2.move_sprite(jet2, 80, 30)
sprites.on_overlap(SpriteKind.player, SpriteKind.Turrel, on_on_overlap21)

def on_on_overlap22(sprite31, otherSprite29):
    sprites.destroy(sprite31)
    doExplosion(otherSprite29)
sprites.on_overlap(SpriteKind.Blast, SpriteKind.Asteroid, on_on_overlap22)

def on_on_zero(status):
    global gamemp
    sprites.destroy_all_sprites_of_kind(SpriteKind.Shield)
    controller.player2.move_sprite(jet2, 0, 0)
    doExplosion(jet2)
    if gamemp == 2:
        pause(1000)
        game.game_over(False)
    if gamemp == 3:
        gamemp = 1
        statusbar2.set_offset_padding(-30, -5)
statusbars.on_zero(StatusBarKind.Shield_2, on_on_zero)

def spawnMineStatic():
    global mineStatic
    mineStatic = sprites.create(assets.image("""
        bomb-2
        """), SpriteKind.MineStatic)
    mineStatic.set_position(randint(0, scene.screen_width()), 0)
    mineStatic.set_velocity(randint(-4, 4), randint(12, 20))
    mineStatic.z += -5
    mineStatic.set_flag(SpriteFlag.AUTO_DESTROY, True)

def on_on_overlap23(sprite23, otherSprite21):
    music.play(music.create_sound_effect(WaveShape.NOISE,
            1,
            147,
            99,
            0,
            404,
            SoundExpressionEffect.VIBRATO,
            InterpolationCurve.LINEAR),
        music.PlaybackMode.IN_BACKGROUND)
    sprites.destroy_all_sprites_of_kind(SpriteKind.Shield)
    if sprite23 == jet1:
        controller.player1.move_sprite(jet1, 4, 2)
        statusbar1.value += randint(-10, -5)
        doShieldImpact(sprite23)
        doExplosion(otherSprite21)
        scene.camera_shake(10, 200)
        pause(200)
        sprites.destroy_all_sprites_of_kind(SpriteKind.Shield)
        controller.player1.move_sprite(jet1, 80, 30)
    if sprite23 == jet2:
        controller.player2.move_sprite(jet2, 4, 2)
        statusbar2.value += randint(-10, -5)
        doShieldImpact(sprite23)
        doExplosion(otherSprite21)
        scene.camera_shake(10, 200)
        pause(200)
        sprites.destroy_all_sprites_of_kind(SpriteKind.Shield)
        controller.player2.move_sprite(jet2, 80, 30)
sprites.on_overlap(SpriteKind.player, SpriteKind.Asteroid, on_on_overlap23)

def on_on_overlap24(sprite24, otherSprite22):
    music.play(music.create_sound_effect(WaveShape.NOISE,
            1,
            147,
            99,
            0,
            404,
            SoundExpressionEffect.VIBRATO,
            InterpolationCurve.LINEAR),
        music.PlaybackMode.IN_BACKGROUND)
    sprites.destroy_all_sprites_of_kind(SpriteKind.Shield)
    if sprite24 == jet1:
        controller.player1.move_sprite(jet1, 4, 2)
        statusbar1.value += randint(-15, -10)
        doShieldImpact(sprite24)
        doExplosion(otherSprite22)
        scene.camera_shake(10, 200)
        pause(200)
        sprites.destroy_all_sprites_of_kind(SpriteKind.Shield)
        controller.player1.move_sprite(jet1, 80, 30)
    if sprite24 == jet2:
        controller.player2.move_sprite(jet2, 4, 2)
        statusbar2.value += randint(-15, -10)
        doShieldImpact(sprite24)
        doExplosion(otherSprite22)
        scene.camera_shake(10, 200)
        pause(200)
        sprites.destroy_all_sprites_of_kind(SpriteKind.Shield)
        controller.player2.move_sprite(jet2, 80, 30)
sprites.on_overlap(SpriteKind.player, SpriteKind.MineStatic, on_on_overlap24)

def on_on_overlap25(sprite33, otherSprite31):
    sprites.destroy(sprite33)
    doExplosion(otherSprite31)
sprites.on_overlap(SpriteKind.PlasmaShot,
    SpriteKind.ContWeapon,
    on_on_overlap25)

def spawnJet1():
    global jet1
    jet1 = sprites.create(assets.image("""
        jet-1
        """), SpriteKind.player)
    if gamemp == 1:
        jet1.set_position(scene.screen_width() / 2, scene.screen_height() * 0.8)
    else:
        jet1.set_position(scene.screen_width() / 2 - 30, scene.screen_height() * 0.8)
    jet1.set_stay_in_screen(True)
    controller.player1.move_sprite(jet1, 100, 30)
    statusbar1.value = 100

def on_on_zero2(status2):
    global gamemp
    sprites.destroy_all_sprites_of_kind(SpriteKind.Shield)
    controller.player1.move_sprite(jet1, 0, 0)
    doExplosion(jet1)
    if gamemp == 1:
        pause(1000)
        game.game_over(False)
    if gamemp == 3:
        gamemp = 2
        statusbar1.set_offset_padding(-30, -5)
statusbars.on_zero(StatusBarKind.Shield_1, on_on_zero2)

def on_on_overlap26(sprite11, otherSprite10):
    music.play(music.create_sound_effect(WaveShape.NOISE,
            1,
            147,
            99,
            0,
            404,
            SoundExpressionEffect.VIBRATO,
            InterpolationCurve.LINEAR),
        music.PlaybackMode.IN_BACKGROUND)
    sprites.destroy_all_sprites_of_kind(SpriteKind.Shield)
    if sprite11 == jet1:
        controller.player1.move_sprite(jet1, 4, 2)
        statusbar1.value += randint(-8, -2)
        doShieldImpact(sprite11)
        doExplosion(otherSprite10)
        scene.camera_shake(10, 200)
        pause(200)
        sprites.destroy_all_sprites_of_kind(SpriteKind.Shield)
        controller.player1.move_sprite(jet1, 80, 30)
    if sprite11 == jet2:
        controller.player2.move_sprite(jet2, 4, 2)
        statusbar2.value += randint(-8, -2)
        doShieldImpact(sprite11)
        doExplosion(otherSprite10)
        scene.camera_shake(10, 200)
        pause(200)
        sprites.destroy_all_sprites_of_kind(SpriteKind.Shield)
        controller.player2.move_sprite(jet2, 80, 30)
sprites.on_overlap(SpriteKind.player, SpriteKind.PlasmaShot, on_on_overlap26)

def on_on_overlap27(sprite25, otherSprite23):
    music.play(music.create_sound_effect(WaveShape.NOISE,
            1,
            147,
            99,
            0,
            404,
            SoundExpressionEffect.VIBRATO,
            InterpolationCurve.LINEAR),
        music.PlaybackMode.IN_BACKGROUND)
    sprites.destroy_all_sprites_of_kind(SpriteKind.Shield)
    if sprite25 == jet1:
        controller.player1.move_sprite(jet1, 4, 2)
        statusbar1.value += randint(-20, -15)
        doShieldImpact(sprite25)
        doExplosion(otherSprite23)
        scene.camera_shake(10, 200)
        pause(200)
        sprites.destroy_all_sprites_of_kind(SpriteKind.Shield)
        controller.player1.move_sprite(jet1, 80, 30)
    if sprite25 == jet2:
        controller.player2.move_sprite(jet2, 4, 2)
        statusbar2.value += randint(-20, -15)
        doShieldImpact(sprite25)
        doExplosion(otherSprite23)
        scene.camera_shake(10, 200)
        pause(200)
        sprites.destroy_all_sprites_of_kind(SpriteKind.Shield)
        controller.player2.move_sprite(jet2, 80, 30)
sprites.on_overlap(SpriteKind.player, SpriteKind.MineHoming, on_on_overlap27)

def on_player1_button_a_pressed():
    global gamemp
    if gamescreen == 3:
        if not (gamemp == 2):
            jetShot1(weaponType1)
    if gamescreen == 2:
        doStartGame()
    if gamescreen == 1:
        gamemp = 1
        doShowTips()
controller.player1.on_button_event(ControllerButton.A,
    ControllerButtonEvent.PRESSED,
    on_player1_button_a_pressed)

def doShieldImpact(jet: Sprite):
    global jetShield
    jetShield = sprites.create(assets.image("""
        infershield
        """), SpriteKind.Shield)
    jetShield.set_position(jet.x, jet.y)
    jetShield.z += -4
    if jet == jet1:
        controller.player1.move_sprite(jetShield, 4, 2)
    if jet == jet2:
        controller.player2.move_sprite(jetShield, 4, 2)

def on_on_overlap28(sprite17, otherSprite16):
    global weaponType1, weaponType2
    sprites.destroy(otherSprite16)
    music.play(music.create_sound_effect(WaveShape.TRIANGLE,
            333,
            2643,
            255,
            0,
            496,
            SoundExpressionEffect.VIBRATO,
            InterpolationCurve.LINEAR),
        music.PlaybackMode.UNTIL_DONE)
    if sprite17 == jet1:
        if weaponType1 < 8:
            weaponType1 += 1
    if sprite17 == jet2:
        if weaponType2 < 8:
            weaponType2 += 1
sprites.on_overlap(SpriteKind.player, SpriteKind.ContWeapon, on_on_overlap28)

def on_on_overlap29(sprite13, otherSprite12):
    sprites.destroy(sprite13)
    doExplosion(otherSprite12)
    info.player1.change_score_by(1)
sprites.on_overlap(SpriteKind.Weapon1, SpriteKind.Asteroid, on_on_overlap29)

def spawnTurrel():
    global turrelBot
    turrelBot = sprites.create(assets.image("""
        turrel
        """), SpriteKind.Turrel)
    turrelBot.set_position(randint(0, scene.screen_width()), 0)
    turrelBot.set_velocity(randint(-4, 4), randint(8, 10))
    turrelBot.z += -5
    turrelBot.set_flag(SpriteFlag.AUTO_DESTROY, True)
    if gamemp == 1:
        turrelBot.follow(jet1, 12)
    if gamemp == 2:
        turrelBot.follow(jet2, 12)
    if gamemp == 3:
        if abs(turrelBot.x - jet1.x) < abs(turrelBot.x - jet2.x):
            turrelBot.follow(jet1, 12)
        else:
            turrelBot.follow(jet2, 12)

def on_on_overlap30(sprite5, otherSprite4):
    sprites.destroy(sprite5)
    doExplosion(otherSprite4)
    info.player1.change_score_by(2)
sprites.on_overlap(SpriteKind.Weapon1, SpriteKind.MineStatic, on_on_overlap30)

def on_on_overlap31(sprite10, otherSprite9):
    sprites.destroy(sprite10)
    doExplosion(otherSprite9)
sprites.on_overlap(SpriteKind.PlasmaShot,
    SpriteKind.MineHoming,
    on_on_overlap31)

def on_player1_button_b_pressed():
    global gamemp
    # game.reset()
    if gamescreen == 3:
        pass
    else:
        if gamescreen == 2:
            doStartGame()
        if gamescreen == 1:
            gamemp = 3
            doShowTips()
controller.player1.on_button_event(ControllerButton.B,
    ControllerButtonEvent.PRESSED,
    on_player1_button_b_pressed)

def turrelPlasmaShot(thisTurrel: Sprite):
    global turrelPlasma
    music.play(music.create_sound_effect(WaveShape.TRIANGLE,
            1578,
            284,
            230,
            0,
            443,
            SoundExpressionEffect.VIBRATO,
            InterpolationCurve.CURVE),
        music.PlaybackMode.IN_BACKGROUND)
    turrelPlasma = sprites.create(assets.image("""
            turrelPlasma
            """),
        SpriteKind.PlasmaShot)
    turrelPlasma.set_position(thisTurrel.x, thisTurrel.y + 4)
    turrelPlasma.set_velocity(0, 100)
    turrelPlasma.z += -5
    turrelPlasma.set_flag(SpriteFlag.AUTO_DESTROY, True)

def on_on_overlap32(sprite6, otherSprite5):
    sprites.destroy(sprite6)
    doExplosion(otherSprite5)
    info.player2.change_score_by(2)
sprites.on_overlap(SpriteKind.Weapon2, SpriteKind.MineStatic, on_on_overlap32)

def on_on_overlap33(sprite8, otherSprite7):
    sprites.destroy(otherSprite7)
    if sprite8 == jet1:
        statusbar1.value += randint(5, 20)
    if sprite8 == jet2:
        statusbar2.value += randint(5, 20)
    music.play(music.create_sound_effect(WaveShape.SINE,
            1132,
            2381,
            146,
            0,
            444,
            SoundExpressionEffect.VIBRATO,
            InterpolationCurve.CURVE),
        music.PlaybackMode.UNTIL_DONE)
sprites.on_overlap(SpriteKind.player, SpriteKind.ContShield, on_on_overlap33)

def on_on_overlap34(sprite35, otherSprite33):
    sprites.destroy(sprite35)
    doExplosion(otherSprite33)
sprites.on_overlap(SpriteKind.PlasmaShot, SpriteKind.Asteroid, on_on_overlap34)

stjerne: Sprite = None
contWeapon: Sprite = None
contShield: Sprite = None
turrelPlasma: Sprite = None
jetShield: Sprite = None
mineStatic: Sprite = None
asteroid: Sprite = None
splash26: TextSprite = None
splash25: TextSprite = None
splash24: TextSprite = None
splash23: TextSprite = None
splash21: TextSprite = None
turrels = 0
explosion: Sprite = None
splash1btnBlue: Sprite = None
splash14: TextSprite = None
splash1btnRed: Sprite = None
splash12: TextSprite = None
splash1title: Sprite = None
mineHoming: Sprite = None
plasmasideleft90: Sprite = None
plasmasideright90: Sprite = None
plasmasideright45: Sprite = None
plasmasideleft45: Sprite = None
plasma: Sprite = None
laser: Sprite = None
railgun: Sprite = None
statusbar2: StatusBarSprite = None
statusbar1: StatusBarSprite = None
jet2: Sprite = None
jet1: Sprite = None
turrelBlast: Sprite = None
turrelBot: Sprite = None
weaponType2 = 0
weaponType1 = 0
gamemp = 0
gamescreen = 0
splash22 = None
gamescreen = 1
gamemp = 1
weaponType1 = 1
weaponType2 = 1
showSplash1()

def on_on_update():
    if gamescreen == 3:
        if (weaponType1 >= 5 or weaponType2 >= 5) and turrels > 0:
            for thisTurrel2 in sprites.all_of_kind(SpriteKind.Turrel):
                if not (gamemp == 2):
                    if abs(thisTurrel2.x - jet1.x) < 5:
                        turrelPlasmaShot(thisTurrel2)
                if not (gamemp == 1):
                    if abs(thisTurrel2.x - jet2.x) < 5:
                        turrelPlasmaShot(thisTurrel2)
game.on_update(on_on_update)

def on_update_interval():
    global contShield
    if gamescreen == 3:
        if Math.percent_chance(weaponType1 + weaponType2):
            contShield = sprites.create(assets.image("""
                    shield-cont
                    """),
                SpriteKind.ContShield)
            contShield.set_position(randint(0, scene.screen_width()), 0)
            contShield.set_velocity(randint(-1, 1), 15)
            contShield.z += -5
            contShield.set_flag(SpriteFlag.AUTO_DESTROY, True)
game.on_update_interval(5000, on_update_interval)

def on_update_interval2():
    global contWeapon
    if gamescreen == 3:
        if info.player1.score() > 22 or info.player2.score() > 22:
            if Math.percent_chance(33):
                contWeapon = sprites.create(assets.image("""
                    wp-cont
                    """), SpriteKind.ContWeapon)
                contWeapon.set_position(randint(0, scene.screen_width()), 0)
                contWeapon.set_velocity(randint(-1, 1), 15)
                contWeapon.z += -5
                contWeapon.set_flag(SpriteFlag.AUTO_DESTROY, True)
game.on_update_interval(12000, on_update_interval2)

def on_update_interval3():
    sprites.destroy_all_sprites_of_kind(SpriteKind.Explosion)
    sprites.destroy_all_sprites_of_kind(SpriteKind.Shield)
game.on_update_interval(2000, on_update_interval3)

def on_update_interval4():
    global stjerne
    if gamescreen == 3:
        if Math.percent_chance(50):
            stjerne = sprites.create_projectile_from_side(assets.image("""
                stjerne
                """), 0, randint(20, 30))
            stjerne.set_position(randint(0, scene.screen_width()), 0)
            stjerne.z += -6
            stjerne.set_flag(SpriteFlag.AUTO_DESTROY, True)
game.on_update_interval(100, on_update_interval4)

def on_update_interval5():
    if gamescreen == 3:
        if Math.percent_chance(10 + weaponType1 * weaponType2):
            spawnAsteroid(randint(1, 3))
        if Math.percent_chance(5) and (weaponType1 >= 2 or weaponType2 >= 2):
            spawnMineStatic()
        if Math.percent_chance(10) and (weaponType1 >= 3 or weaponType2 >= 3):
            spawnMineHoming()
        if Math.percent_chance(2) and (weaponType1 >= 5 or weaponType2 >= 5):
            spawnTurrel()
        if Math.percent_chance(1) and (weaponType1 >= 6 or weaponType2 >= 6):
            turrelBlastShot()
game.on_update_interval(200, on_update_interval5)
