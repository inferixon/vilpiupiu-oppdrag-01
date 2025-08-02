namespace SpriteKind {
    export const MineHoming = SpriteKind.create()
    export const Weapon1 = SpriteKind.create()
    export const wallside = SpriteKind.create()
    export const wallbtm = SpriteKind.create()
    export const ContWeapon = SpriteKind.create()
    export const Blast = SpriteKind.create()
    export const Explosion = SpriteKind.create()
    export const ContShield = SpriteKind.create()
    export const Asteroid = SpriteKind.create()
    export const MineStatic = SpriteKind.create()
    export const Turrel = SpriteKind.create()
    export const PlasmaShot = SpriteKind.create()
    export const Shield = SpriteKind.create()
    export const Weapon2 = SpriteKind.create()
    export const Splash = SpriteKind.create()
}
namespace StatusBarKind {
    export const Shield_1 = StatusBarKind.create()
    export const Shield_2 = StatusBarKind.create()
}
sprites.onOverlap(SpriteKind.Weapon1, SpriteKind.ContWeapon, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    doExplosion(otherSprite)
})
function turrelBlastShot () {
    if (turrelBot.x > 0) {
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 1, 1489, 255, 0, 396, SoundExpressionEffect.Warble, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
        turrelBlast = sprites.create(assets.image`turrelBlast`, SpriteKind.Blast)
        turrelBlast.setPosition(turrelBot.x, turrelBot.y)
        turrelBlast.z += -5
        animation.runImageAnimation(
        turrelBlast,
        assets.animation`turrelBlast`,
        200,
        true
        )
        turrelBlast.setFlag(SpriteFlag.AutoDestroy, true)
        if (gamemp == 1) {
            turrelBlast.follow(jet1, 22)
        }
        if (gamemp == 2) {
            turrelBlast.follow(jet2, 22)
        }
        if (gamemp == 3) {
            if (Math.abs(turrelBlast.x - jet1.x) < Math.abs(turrelBlast.x - jet2.x)) {
                turrelBlast.follow(jet1, 12)
            } else {
                turrelBlast.follow(jet2, 12)
            }
        }
        sprites.destroy(turrelBot, effects.fire, 500)
    }
}
function doStartGame () {
    scene.setBackgroundImage(assets.image`splash-3`)
    sprites.destroyAllSpritesOfKind(SpriteKind.Splash)
    sprites.destroyAllSpritesOfKind(SpriteKind.Text)
    if (gamemp == 1) {
        info.player1.setScore(0)
        info.player2.setScore(0)
        statusbar1 = statusbars.create(20, 2, StatusBarKind.Shield_1)
        statusbar1.setColor(8, 2)
        statusbar1.positionDirection(CollisionDirection.Top)
        statusbar1.setOffsetPadding(-30, 0)
        statusbar2 = statusbars.create(20, 2, StatusBarKind.Shield_2)
        statusbar2.setColor(8, 2)
        statusbar2.positionDirection(CollisionDirection.Top)
        statusbar2.setOffsetPadding(30, -5)
        gamescreen = 3
        spawnJet1()
    }
    if (gamemp == 3) {
        info.player1.setScore(0)
        info.player2.setScore(0)
        statusbar1 = statusbars.create(20, 2, StatusBarKind.Shield_1)
        statusbar1.setColor(8, 2)
        statusbar1.positionDirection(CollisionDirection.Top)
        statusbar1.setOffsetPadding(-30, 0)
        statusbar2 = statusbars.create(20, 2, StatusBarKind.Shield_2)
        statusbar2.setColor(8, 2)
        statusbar2.positionDirection(CollisionDirection.Top)
        statusbar2.setOffsetPadding(30, 0)
        gamescreen = 3
        spawnJet1()
        spawnJet2()
    }
}
sprites.onOverlap(SpriteKind.Blast, SpriteKind.ContShield, function (sprite21, otherSprite19) {
    sprites.destroy(sprite21)
    doExplosion(otherSprite19)
})
controller.player2.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    // game.reset()
    if (gamescreen == 3) {
    	
    } else {
        if (gamescreen == 2) {
            doStartGame()
        }
        if (gamescreen == 1) {
            gamemp = 3
            doShowTips()
        }
    }
})
sprites.onOverlap(SpriteKind.Weapon1, SpriteKind.ContShield, function (sprite27, otherSprite25) {
    sprites.destroy(sprite27)
    doExplosion(otherSprite25)
})
function jetShot2 (num: number) {
    // cannon
    if (num == 1) {
        railgun = sprites.create(assets.image`cannon`, SpriteKind.Weapon2)
        railgun.setPosition(jet2.x - 0, jet2.y - 14)
        railgun.setVelocity(0, -33)
        railgun.setFlag(SpriteFlag.AutoDestroy, true)
        music.play(music.createSoundEffect(WaveShape.Noise, 3419, 1, 255, 0, 107, SoundExpressionEffect.Tremolo, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    }
    // cannon
    if (num == 2) {
        railgun = sprites.create(assets.image`vulkan`, SpriteKind.Weapon2)
        railgun.setPosition(jet2.x - 0, jet2.y - 13)
        railgun.setVelocity(0, -55)
        railgun.setFlag(SpriteFlag.AutoDestroy, true)
        music.play(music.createSoundEffect(WaveShape.Noise, 4211, 1, 255, 0, 104, SoundExpressionEffect.Tremolo, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
    if (num == 3) {
        laser = sprites.create(assets.image`lasershot-1x`, SpriteKind.Weapon2)
        laser.setPosition(jet2.x - 0, jet2.y - 10)
        laser.setVelocity(0, -222)
        laser.setFlag(SpriteFlag.AutoDestroy, true)
        music.play(music.createSoundEffect(WaveShape.Triangle, 1181, 137, 255, 0, 320, SoundExpressionEffect.Tremolo, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    }
    if (num == 4) {
        laser = sprites.create(assets.image`lasershot-2x`, SpriteKind.Weapon2)
        laser.setPosition(jet2.x - 0, jet2.y - 8)
        laser.setVelocity(0, -222)
        laser.setFlag(SpriteFlag.AutoDestroy, true)
        music.play(music.createSoundEffect(WaveShape.Triangle, 1288, 137, 255, 0, 320, SoundExpressionEffect.Tremolo, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    }
    if (num == 5) {
        plasma = sprites.create(assets.image`plasmashot-2x`, SpriteKind.Weapon2)
        plasma.setPosition(jet2.x - 0, jet2.y - 12)
        plasma.setVelocity(0, -111)
        plasma.setFlag(SpriteFlag.AutoDestroy, true)
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 878, 499, 255, 0, 557, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
    if (num == 6) {
        plasma = sprites.create(assets.image`plasmashot-3x`, SpriteKind.Weapon2)
        plasma.setPosition(jet2.x - 0, jet2.y - 12)
        plasma.setVelocity(0, -111)
        plasma.setFlag(SpriteFlag.AutoDestroy, true)
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 1199, 499, 255, 0, 557, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
    if (num == 7) {
        plasma = sprites.create(assets.image`phusionshot-3x`, SpriteKind.Weapon2)
        plasma.setPosition(jet2.x - 0, jet2.y - 12)
        plasma.setVelocity(0, -144)
        plasmasideleft45 = sprites.create(assets.image`side-left-45`, SpriteKind.Weapon2)
        plasmasideleft45.setPosition(jet2.x - 1, jet2.y - 2)
        plasmasideleft45.setVelocity(-77, -144)
        plasmasideright45 = sprites.create(assets.image`side-right-45`, SpriteKind.Weapon2)
        plasmasideright45.setPosition(jet2.x + 1, jet2.y - 2)
        plasmasideright45.setVelocity(77, -144)
        plasma.setFlag(SpriteFlag.AutoDestroy, true)
        plasmasideleft45.setFlag(SpriteFlag.AutoDestroy, true)
        plasmasideright45.setFlag(SpriteFlag.AutoDestroy, true)
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 1244, 499, 255, 0, 557, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
    if (num == 8) {
        plasma = sprites.create(assets.image`phusionshot-3x`, SpriteKind.Weapon2)
        plasma.setPosition(jet2.x - 0, jet2.y - 12)
        plasma.setVelocity(0, -144)
        plasmasideleft45 = sprites.create(assets.image`side-left-45`, SpriteKind.Weapon2)
        plasmasideleft45.setPosition(jet2.x - 1, jet2.y - 2)
        plasmasideleft45.setVelocity(-77, -144)
        plasmasideright45 = sprites.create(assets.image`side-right-45`, SpriteKind.Weapon2)
        plasmasideright45.setPosition(jet2.x + 1, jet2.y - 2)
        plasmasideright45.setVelocity(77, -144)
        plasmasideright90 = sprites.create(assets.image`side-right-90`, SpriteKind.Weapon2)
        plasmasideright90.setPosition(jet2.x + 0, jet2.y - 7)
        plasmasideright90.setVelocity(144, 0)
        plasmasideleft90 = sprites.create(assets.image`side-left-90`, SpriteKind.Weapon2)
        plasmasideleft90.setPosition(jet2.x - 0, jet2.y - 7)
        plasmasideleft90.setVelocity(-144, 0)
        plasma.setFlag(SpriteFlag.AutoDestroy, true)
        plasmasideleft45.setFlag(SpriteFlag.AutoDestroy, true)
        plasmasideright45.setFlag(SpriteFlag.AutoDestroy, true)
        plasmasideleft90.setFlag(SpriteFlag.AutoDestroy, true)
        plasmasideright90.setFlag(SpriteFlag.AutoDestroy, true)
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 1645, 499, 255, 0, 557, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
}
function spawnMineHoming () {
    mineHoming = sprites.create(assets.image`bomb`, SpriteKind.MineHoming)
    mineHoming.setPosition(randint(0, scene.screenWidth()), 0)
    mineHoming.setVelocity(randint(-4, 4), randint(12, 20))
    mineHoming.z += -5
    animation.runImageAnimation(
    mineHoming,
    assets.animation`mine-homing`,
    333,
    true
    )
    mineHoming.setFlag(SpriteFlag.AutoDestroy, true)
    if (gamemp == 1) {
        mineHoming.follow(jet1, 24)
    }
    if (gamemp == 2) {
        mineHoming.follow(jet2, 24)
    }
    if (gamemp == 3) {
        if (Math.abs(mineHoming.x - jet1.x) < Math.abs(mineHoming.x - jet2.x)) {
            mineHoming.follow(jet1, 24)
        } else {
            mineHoming.follow(jet2, 24)
        }
    }
}
sprites.onOverlap(SpriteKind.Weapon2, SpriteKind.Asteroid, function (sprite26, otherSprite24) {
    sprites.destroy(sprite26)
    doExplosion(otherSprite24)
    info.player2.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Weapon1, SpriteKind.Blast, function (sprite30, otherSprite28) {
    otherSprite28.y += randint(-15, -25)
    otherSprite28.x += randint(-10, 10)
})
function showSplash1 () {
    scene.setBackgroundImage(assets.image`splash1bg`)
    sprites.destroyAllSpritesOfKind(SpriteKind.Splash)
    splash1title = sprites.create(assets.image`splash1title3`, SpriteKind.Splash)
    splash1title.setScale(0.9, ScaleAnchor.Middle)
    splash1title.setPosition(80, 33)
    splash12 = textsprite.create("1 PLAYER", 15, 2)
    splash12.setMaxFontHeight(10)
    splash12.setPosition(65, 67)
    splash1btnRed = sprites.create(assets.image`btnRed`, SpriteKind.Splash)
    splash1btnRed.setPosition(140, 67)
    splash14 = textsprite.create("2 PLAYERS", 15, 8)
    splash14.setMaxFontHeight(10)
    splash14.setPosition(67, 90)
    splash1btnBlue = sprites.create(assets.image`btnBlue`, SpriteKind.Splash)
    splash1btnBlue.setPosition(140, 90)
}
sprites.onOverlap(SpriteKind.Blast, SpriteKind.ContWeapon, function (sprite15, otherSprite14) {
    sprites.destroy(sprite15)
    doExplosion(otherSprite14)
})
function doExplosion (expsprite: Sprite) {
    music.play(music.createSoundEffect(WaveShape.Noise, 1, 1534, 255, 0, 150, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    explosion = sprites.create(assets.image`explosion-place`, SpriteKind.Explosion)
    explosion.setPosition(expsprite.x, expsprite.y)
    explosion.setVelocity(expsprite.vx, expsprite.vy)
    explosion.z = 1
    explosion.setFlag(SpriteFlag.AutoDestroy, true)
    animation.runImageAnimation(
    explosion,
    assets.animation`explosion`,
    100,
    false
    )
    pause(150)
    sprites.destroy(expsprite)
}
sprites.onOverlap(SpriteKind.Weapon2, SpriteKind.ContWeapon, function (sprite28, otherSprite26) {
    sprites.destroy(sprite28)
    doExplosion(otherSprite26)
})
sprites.onDestroyed(SpriteKind.Turrel, function (sprite3) {
    turrels += -1
})
function spawnJet2 () {
    jet2 = sprites.create(assets.image`jet-2`, SpriteKind.Player)
    jet2.setPosition(scene.screenWidth() / 2 + 30, scene.screenHeight() * 0.8)
    jet2.setStayInScreen(true)
    controller.player2.moveSprite(jet2, 100, 30)
    statusbar2.value = 100
}
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (gamescreen == 3) {
        if (!(gamemp == 1)) {
            jetShot2(weaponType2)
        }
    }
    if (gamescreen == 2) {
        doStartGame()
    }
    if (gamescreen == 1) {
        gamemp = 1
        doShowTips()
    }
})
function doShowTips () {
    gamescreen = 2
    sprites.destroyAllSpritesOfKind(SpriteKind.Splash)
    sprites.destroyAllSpritesOfKind(SpriteKind.Text)
    scene.setBackgroundImage(assets.image`splash1bg`)
    splash21 = textsprite.create("RED button to FIRE", 15, 2)
    splash21.setMaxFontHeight(8)
    splash21.setPosition(80, 25)
    // splash22 = textsprite.create("BLUE button to RESET game", 15, 8)
    // splash22.setMaxFontHeight(8)
    // splash22.setPosition(80, 40)
    splash23 = textsprite.create("Collect containers", 15, 9)
    splash23.setMaxFontHeight(9)
    splash23.setPosition(80, 50)
    splash24 = textsprite.create("to refill your shield", 15, 9)
    splash24.setMaxFontHeight(9)
    splash24.setPosition(80, 60)
    splash25 = textsprite.create("and upgrade your weapons", 15, 9)
    splash25.setMaxFontHeight(9)
    splash25.setPosition(80, 70)
    splash26 = textsprite.create("Press ANY to START", 15, 1)
    splash26.setMaxFontHeight(9)
    splash26.setPosition(80, 95)
}
sprites.onOverlap(SpriteKind.Weapon1, SpriteKind.MineHoming, function (sprite7, otherSprite6) {
    sprites.destroy(sprite7)
    doExplosion(otherSprite6)
    info.player1.changeScoreBy(5)
})
sprites.onOverlap(SpriteKind.PlasmaShot, SpriteKind.MineStatic, function (sprite4, otherSprite3) {
    sprites.destroy(sprite4)
    doExplosion(otherSprite3)
})
sprites.onOverlap(SpriteKind.PlasmaShot, SpriteKind.Turrel, function (sprite36, otherSprite34) {
    sprites.destroy(sprite36)
    doExplosion(otherSprite34)
})
sprites.onCreated(SpriteKind.Turrel, function (sprite18) {
    turrels += 1
})
sprites.onOverlap(SpriteKind.Weapon1, SpriteKind.Turrel, function (sprite20, otherSprite18) {
    sprites.destroy(sprite20, effects.fire, 100)
    if (Math.percentChance(50)) {
        doExplosion(otherSprite18)
        info.player1.changeScoreBy(7)
    }
})
sprites.onOverlap(SpriteKind.Weapon2, SpriteKind.ContShield, function (sprite19, otherSprite17) {
    sprites.destroy(sprite19)
    doExplosion(otherSprite17)
})
function jetShot1 (num2: number) {
    // cannon
    if (num2 == 1) {
        railgun = sprites.create(assets.image`cannon`, SpriteKind.Weapon1)
        railgun.setPosition(jet1.x - 0, jet1.y - 14)
        railgun.setVelocity(0, -33)
        railgun.setFlag(SpriteFlag.AutoDestroy, true)
        music.play(music.createSoundEffect(WaveShape.Noise, 3419, 1, 255, 0, 107, SoundExpressionEffect.Tremolo, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    }
    // cannon
    if (num2 == 2) {
        railgun = sprites.create(assets.image`vulkan`, SpriteKind.Weapon1)
        railgun.setPosition(jet1.x - 0, jet1.y - 13)
        railgun.setVelocity(0, -55)
        railgun.setFlag(SpriteFlag.AutoDestroy, true)
        music.play(music.createSoundEffect(WaveShape.Noise, 4211, 1, 255, 0, 104, SoundExpressionEffect.Tremolo, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
    if (num2 == 3) {
        laser = sprites.create(assets.image`lasershot-1x`, SpriteKind.Weapon1)
        laser.setPosition(jet1.x - 0, jet1.y - 10)
        laser.setVelocity(0, -222)
        laser.setFlag(SpriteFlag.AutoDestroy, true)
        music.play(music.createSoundEffect(WaveShape.Triangle, 1181, 137, 255, 0, 320, SoundExpressionEffect.Tremolo, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    }
    if (num2 == 4) {
        laser = sprites.create(assets.image`lasershot-2x`, SpriteKind.Weapon1)
        laser.setPosition(jet1.x - 0, jet1.y - 8)
        laser.setVelocity(0, -222)
        laser.setFlag(SpriteFlag.AutoDestroy, true)
        music.play(music.createSoundEffect(WaveShape.Triangle, 1288, 137, 255, 0, 320, SoundExpressionEffect.Tremolo, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    }
    if (num2 == 5) {
        plasma = sprites.create(assets.image`plasmashot-2x`, SpriteKind.Weapon1)
        plasma.setPosition(jet1.x - 0, jet1.y - 12)
        plasma.setVelocity(0, -111)
        plasma.setFlag(SpriteFlag.AutoDestroy, true)
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 878, 499, 255, 0, 557, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
    if (num2 == 6) {
        plasma = sprites.create(assets.image`plasmashot-3x`, SpriteKind.Weapon1)
        plasma.setPosition(jet1.x - 0, jet1.y - 12)
        plasma.setVelocity(0, -111)
        plasma.setFlag(SpriteFlag.AutoDestroy, true)
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 1199, 499, 255, 0, 557, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
    if (num2 == 7) {
        plasma = sprites.create(assets.image`phusionshot-3x`, SpriteKind.Weapon1)
        plasma.setPosition(jet1.x - 0, jet1.y - 12)
        plasma.setVelocity(0, -144)
        plasmasideleft45 = sprites.create(assets.image`side-left-45`, SpriteKind.Weapon1)
        plasmasideleft45.setPosition(jet1.x - 1, jet1.y - 2)
        plasmasideleft45.setVelocity(-77, -144)
        plasmasideright45 = sprites.create(assets.image`side-right-45`, SpriteKind.Weapon1)
        plasmasideright45.setPosition(jet1.x + 1, jet1.y - 2)
        plasmasideright45.setVelocity(77, -144)
        plasma.setFlag(SpriteFlag.AutoDestroy, true)
        plasmasideleft45.setFlag(SpriteFlag.AutoDestroy, true)
        plasmasideright45.setFlag(SpriteFlag.AutoDestroy, true)
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 1244, 499, 255, 0, 557, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
    if (num2 == 8) {
        plasma = sprites.create(assets.image`phusionshot-3x`, SpriteKind.Weapon1)
        plasma.setPosition(jet1.x - 0, jet1.y - 12)
        plasma.setVelocity(0, -144)
        plasmasideleft45 = sprites.create(assets.image`side-left-45`, SpriteKind.Weapon1)
        plasmasideleft45.setPosition(jet1.x - 1, jet1.y - 2)
        plasmasideleft45.setVelocity(-77, -144)
        plasmasideright45 = sprites.create(assets.image`side-right-45`, SpriteKind.Weapon1)
        plasmasideright45.setPosition(jet1.x + 1, jet1.y - 2)
        plasmasideright45.setVelocity(77, -144)
        plasmasideright90 = sprites.create(assets.image`side-right-90`, SpriteKind.Weapon1)
        plasmasideright90.setPosition(jet1.x + 0, jet1.y - 7)
        plasmasideright90.setVelocity(144, 0)
        plasmasideleft90 = sprites.create(assets.image`side-left-90`, SpriteKind.Weapon1)
        plasmasideleft90.setPosition(jet1.x - 0, jet1.y - 7)
        plasmasideleft90.setVelocity(-144, 0)
        plasma.setFlag(SpriteFlag.AutoDestroy, true)
        plasmasideleft45.setFlag(SpriteFlag.AutoDestroy, true)
        plasmasideright45.setFlag(SpriteFlag.AutoDestroy, true)
        plasmasideleft90.setFlag(SpriteFlag.AutoDestroy, true)
        plasmasideright90.setFlag(SpriteFlag.AutoDestroy, true)
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 1645, 499, 255, 0, 557, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
}
sprites.onOverlap(SpriteKind.Blast, SpriteKind.MineStatic, function (sprite22, otherSprite20) {
    sprites.destroy(sprite22)
    doExplosion(otherSprite20)
})
sprites.onOverlap(SpriteKind.Weapon2, SpriteKind.Blast, function (sprite29, otherSprite27) {
    otherSprite27.y += randint(-15, -25)
    otherSprite27.x += randint(-10, 10)
})
sprites.onOverlap(SpriteKind.Blast, SpriteKind.Turrel, function (sprite16, otherSprite15) {
    sprites.destroy(sprite16)
    doExplosion(otherSprite15)
})
function spawnAsteroid (num3: number) {
    asteroid = sprites.create(assets.image`ast-1`, SpriteKind.Asteroid)
    if (num3 == 1) {
        animation.runImageAnimation(
        asteroid,
        assets.animation`aster-1`,
        444,
        true
        )
    }
    if (num3 == 2) {
        animation.runImageAnimation(
        asteroid,
        assets.animation`aster-2`,
        333,
        true
        )
    }
    if (num3 == 3) {
        animation.runImageAnimation(
        asteroid,
        assets.animation`aster-3`,
        399,
        true
        )
    }
    asteroid.setPosition(randint(0, scene.screenWidth()), 0)
    asteroid.setVelocity(randint(-3, 3), randint(8, 12))
    asteroid.z += -5
    asteroid.setFlag(SpriteFlag.AutoDestroy, true)
}
sprites.onOverlap(SpriteKind.PlasmaShot, SpriteKind.ContShield, function (sprite12, otherSprite11) {
    sprites.destroy(sprite12)
    doExplosion(otherSprite11)
})
sprites.onOverlap(SpriteKind.Blast, SpriteKind.MineHoming, function (sprite2, otherSprite2) {
    sprites.destroy(sprite2)
    doExplosion(otherSprite2)
})
sprites.onOverlap(SpriteKind.Weapon2, SpriteKind.Turrel, function (sprite14, otherSprite13) {
    sprites.destroy(sprite14, effects.fire, 100)
    if (Math.percentChance(50)) {
        doExplosion(otherSprite13)
        info.player2.changeScoreBy(7)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Blast, function (sprite32, otherSprite30) {
    music.play(music.createSoundEffect(WaveShape.Noise, 1, 147, 99, 0, 404, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
    if (sprite32 == jet1) {
        controller.player1.moveSprite(jet1, 4, 2)
        statusbar1.value += randint(-16, -8)
        doShieldImpact(sprite32)
        doExplosion(otherSprite30)
        scene.cameraShake(10, 200)
        pause(200)
        sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
        controller.player1.moveSprite(jet1, 80, 30)
    }
    if (sprite32 == jet2) {
        controller.player2.moveSprite(jet2, 4, 2)
        statusbar2.value += randint(-16, -8)
        doShieldImpact(sprite32)
        doExplosion(otherSprite30)
        scene.cameraShake(10, 200)
        pause(200)
        sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
        controller.player2.moveSprite(jet2, 80, 30)
    }
})
sprites.onOverlap(SpriteKind.Weapon2, SpriteKind.MineHoming, function (sprite9, otherSprite8) {
    sprites.destroy(sprite9)
    doExplosion(otherSprite8)
    info.player2.changeScoreBy(5)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Turrel, function (sprite34, otherSprite32) {
    music.play(music.createSoundEffect(WaveShape.Noise, 1, 147, 99, 0, 404, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
    if (sprite34 == jet1) {
        controller.player1.moveSprite(jet1, 4, 2)
        statusbar1.value += randint(-15, -5)
        doShieldImpact(sprite34)
        doExplosion(otherSprite32)
        scene.cameraShake(10, 200)
        pause(200)
        sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
        controller.player1.moveSprite(jet1, 80, 30)
    }
    if (sprite34 == jet1) {
        controller.player2.moveSprite(jet2, 4, 2)
        statusbar2.value += randint(-15, -5)
        doShieldImpact(sprite34)
        doExplosion(otherSprite32)
        scene.cameraShake(10, 200)
        pause(200)
        sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
        controller.player2.moveSprite(jet2, 80, 30)
    }
})
sprites.onOverlap(SpriteKind.Blast, SpriteKind.Asteroid, function (sprite31, otherSprite29) {
    sprites.destroy(sprite31)
    doExplosion(otherSprite29)
})
statusbars.onZero(StatusBarKind.Shield_2, function (status) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
    controller.player2.moveSprite(jet2, 0, 0)
    doExplosion(jet2)
    if (gamemp == 2) {
        pause(1000)
        game.gameOver(false)
    }
    if (gamemp == 3) {
        gamemp = 1
        statusbar2.setOffsetPadding(-30, -5)
    }
})
function spawnMineStatic () {
    mineStatic = sprites.create(assets.image`bomb-2`, SpriteKind.MineStatic)
    mineStatic.setPosition(randint(0, scene.screenWidth()), 0)
    mineStatic.setVelocity(randint(-4, 4), randint(12, 20))
    mineStatic.z += -5
    mineStatic.setFlag(SpriteFlag.AutoDestroy, true)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Asteroid, function (sprite23, otherSprite21) {
    music.play(music.createSoundEffect(WaveShape.Noise, 1, 147, 99, 0, 404, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
    if (sprite23 == jet1) {
        controller.player1.moveSprite(jet1, 4, 2)
        statusbar1.value += randint(-10, -5)
        doShieldImpact(sprite23)
        doExplosion(otherSprite21)
        scene.cameraShake(10, 200)
        pause(200)
        sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
        controller.player1.moveSprite(jet1, 80, 30)
    }
    if (sprite23 == jet2) {
        controller.player2.moveSprite(jet2, 4, 2)
        statusbar2.value += randint(-10, -5)
        doShieldImpact(sprite23)
        doExplosion(otherSprite21)
        scene.cameraShake(10, 200)
        pause(200)
        sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
        controller.player2.moveSprite(jet2, 80, 30)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.MineStatic, function (sprite24, otherSprite22) {
    music.play(music.createSoundEffect(WaveShape.Noise, 1, 147, 99, 0, 404, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
    if (sprite24 == jet1) {
        controller.player1.moveSprite(jet1, 4, 2)
        statusbar1.value += randint(-15, -10)
        doShieldImpact(sprite24)
        doExplosion(otherSprite22)
        scene.cameraShake(10, 200)
        pause(200)
        sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
        controller.player1.moveSprite(jet1, 80, 30)
    }
    if (sprite24 == jet2) {
        controller.player2.moveSprite(jet2, 4, 2)
        statusbar2.value += randint(-15, -10)
        doShieldImpact(sprite24)
        doExplosion(otherSprite22)
        scene.cameraShake(10, 200)
        pause(200)
        sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
        controller.player2.moveSprite(jet2, 80, 30)
    }
})
sprites.onOverlap(SpriteKind.PlasmaShot, SpriteKind.ContWeapon, function (sprite33, otherSprite31) {
    sprites.destroy(sprite33)
    doExplosion(otherSprite31)
})
function spawnJet1 () {
    jet1 = sprites.create(assets.image`jet-1`, SpriteKind.Player)
    if (gamemp == 1) {
        jet1.setPosition(scene.screenWidth() / 2, scene.screenHeight() * 0.8)
    } else {
        jet1.setPosition(scene.screenWidth() / 2 - 30, scene.screenHeight() * 0.8)
    }
    jet1.setStayInScreen(true)
    controller.player1.moveSprite(jet1, 100, 30)
    statusbar1.value = 100
}
statusbars.onZero(StatusBarKind.Shield_1, function (status2) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
    controller.player1.moveSprite(jet1, 0, 0)
    doExplosion(jet1)
    if (gamemp == 1) {
        pause(1000)
        game.gameOver(false)
    }
    if (gamemp == 3) {
        gamemp = 2
        statusbar1.setOffsetPadding(-30, -5)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.PlasmaShot, function (sprite11, otherSprite10) {
    music.play(music.createSoundEffect(WaveShape.Noise, 1, 147, 99, 0, 404, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
    if (sprite11 == jet1) {
        controller.player1.moveSprite(jet1, 4, 2)
        statusbar1.value += randint(-8, -2)
        doShieldImpact(sprite11)
        doExplosion(otherSprite10)
        scene.cameraShake(10, 200)
        pause(200)
        sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
        controller.player1.moveSprite(jet1, 80, 30)
    }
    if (sprite11 == jet2) {
        controller.player2.moveSprite(jet2, 4, 2)
        statusbar2.value += randint(-8, -2)
        doShieldImpact(sprite11)
        doExplosion(otherSprite10)
        scene.cameraShake(10, 200)
        pause(200)
        sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
        controller.player2.moveSprite(jet2, 80, 30)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.MineHoming, function (sprite25, otherSprite23) {
    music.play(music.createSoundEffect(WaveShape.Noise, 1, 147, 99, 0, 404, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
    if (sprite25 == jet1) {
        controller.player1.moveSprite(jet1, 4, 2)
        statusbar1.value += randint(-20, -15)
        doShieldImpact(sprite25)
        doExplosion(otherSprite23)
        scene.cameraShake(10, 200)
        pause(200)
        sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
        controller.player1.moveSprite(jet1, 80, 30)
    }
    if (sprite25 == jet2) {
        controller.player2.moveSprite(jet2, 4, 2)
        statusbar2.value += randint(-20, -15)
        doShieldImpact(sprite25)
        doExplosion(otherSprite23)
        scene.cameraShake(10, 200)
        pause(200)
        sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
        controller.player2.moveSprite(jet2, 80, 30)
    }
})
controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (gamescreen == 3) {
        if (!(gamemp == 2)) {
            jetShot1(weaponType1)
        }
    }
    if (gamescreen == 2) {
        doStartGame()
    }
    if (gamescreen == 1) {
        gamemp = 1
        doShowTips()
    }
})
function doShieldImpact (jet: Sprite) {
    jetShield = sprites.create(assets.image`infershield`, SpriteKind.Shield)
    jetShield.setPosition(jet.x, jet.y)
    jetShield.z += -4
    if (jet == jet1) {
        controller.player1.moveSprite(jetShield, 4, 2)
    }
    if (jet == jet2) {
        controller.player2.moveSprite(jetShield, 4, 2)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.ContWeapon, function (sprite17, otherSprite16) {
    sprites.destroy(otherSprite16)
    music.play(music.createSoundEffect(WaveShape.Triangle, 333, 2643, 255, 0, 496, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    if (sprite17 == jet1) {
        if (weaponType1 < 8) {
            weaponType1 += 1
        }
    }
    if (sprite17 == jet2) {
        if (weaponType2 < 8) {
            weaponType2 += 1
        }
    }
})
sprites.onOverlap(SpriteKind.Weapon1, SpriteKind.Asteroid, function (sprite13, otherSprite12) {
    sprites.destroy(sprite13)
    doExplosion(otherSprite12)
    info.player1.changeScoreBy(1)
})
function spawnTurrel () {
    turrelBot = sprites.create(assets.image`turrel`, SpriteKind.Turrel)
    turrelBot.setPosition(randint(0, scene.screenWidth()), 0)
    turrelBot.setVelocity(randint(-4, 4), randint(8, 10))
    turrelBot.z += -5
    turrelBot.setFlag(SpriteFlag.AutoDestroy, true)
    if (gamemp == 1) {
        turrelBot.follow(jet1, 12)
    }
    if (gamemp == 2) {
        turrelBot.follow(jet2, 12)
    }
    if (gamemp == 3) {
        if (Math.abs(turrelBot.x - jet1.x) < Math.abs(turrelBot.x - jet2.x)) {
            turrelBot.follow(jet1, 12)
        } else {
            turrelBot.follow(jet2, 12)
        }
    }
}
sprites.onOverlap(SpriteKind.Weapon1, SpriteKind.MineStatic, function (sprite5, otherSprite4) {
    sprites.destroy(sprite5)
    doExplosion(otherSprite4)
    info.player1.changeScoreBy(2)
})
sprites.onOverlap(SpriteKind.PlasmaShot, SpriteKind.MineHoming, function (sprite10, otherSprite9) {
    sprites.destroy(sprite10)
    doExplosion(otherSprite9)
})
controller.player1.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    // game.reset()
    if (gamescreen == 3) {
    	
    } else {
        if (gamescreen == 2) {
            doStartGame()
        }
        if (gamescreen == 1) {
            gamemp = 3
            doShowTips()
        }
    }
})
function turrelPlasmaShot (thisTurrel: Sprite) {
    music.play(music.createSoundEffect(WaveShape.Triangle, 1578, 284, 230, 0, 443, SoundExpressionEffect.Vibrato, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    turrelPlasma = sprites.create(assets.image`turrelPlasma`, SpriteKind.PlasmaShot)
    turrelPlasma.setPosition(thisTurrel.x, thisTurrel.y + 4)
    turrelPlasma.setVelocity(0, 100)
    turrelPlasma.z += -5
    turrelPlasma.setFlag(SpriteFlag.AutoDestroy, true)
}
sprites.onOverlap(SpriteKind.Weapon2, SpriteKind.MineStatic, function (sprite6, otherSprite5) {
    sprites.destroy(sprite6)
    doExplosion(otherSprite5)
    info.player2.changeScoreBy(2)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ContShield, function (sprite8, otherSprite7) {
    sprites.destroy(otherSprite7)
    if (sprite8 == jet1) {
        statusbar1.value += randint(5, 20)
    }
    if (sprite8 == jet2) {
        statusbar2.value += randint(5, 20)
    }
    music.play(music.createSoundEffect(WaveShape.Sine, 1132, 2381, 146, 0, 444, SoundExpressionEffect.Vibrato, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.PlasmaShot, SpriteKind.Asteroid, function (sprite35, otherSprite33) {
    sprites.destroy(sprite35)
    doExplosion(otherSprite33)
})
let stjerne: Sprite = null
let contWeapon: Sprite = null
let contShield: Sprite = null
let turrelPlasma: Sprite = null
let jetShield: Sprite = null
let mineStatic: Sprite = null
let asteroid: Sprite = null
let splash26: TextSprite = null
let splash25: TextSprite = null
let splash24: TextSprite = null
let splash23: TextSprite = null
let splash21: TextSprite = null
let turrels = 0
let explosion: Sprite = null
let splash1btnBlue: Sprite = null
let splash14: TextSprite = null
let splash1btnRed: Sprite = null
let splash12: TextSprite = null
let splash1title: Sprite = null
let mineHoming: Sprite = null
let plasmasideleft90: Sprite = null
let plasmasideright90: Sprite = null
let plasmasideright45: Sprite = null
let plasmasideleft45: Sprite = null
let plasma: Sprite = null
let laser: Sprite = null
let railgun: Sprite = null
let statusbar2: StatusBarSprite = null
let statusbar1: StatusBarSprite = null
let jet2: Sprite = null
let jet1: Sprite = null
let turrelBlast: Sprite = null
let turrelBot: Sprite = null
let weaponType2 = 0
let weaponType1 = 0
let gamemp = 0
let gamescreen = 0
let splash22 = null
gamescreen = 1
gamemp = 1
weaponType1 = 1
weaponType2 = 1
showSplash1()
game.onUpdate(function () {
    if (gamescreen == 3) {
        if ((weaponType1 >= 5 || weaponType2 >= 5) && turrels > 0) {
            for (let thisTurrel2 of sprites.allOfKind(SpriteKind.Turrel)) {
                if (!(gamemp == 2)) {
                    if (Math.abs(thisTurrel2.x - jet1.x) < 5) {
                        turrelPlasmaShot(thisTurrel2)
                    }
                }
                if (!(gamemp == 1)) {
                    if (Math.abs(thisTurrel2.x - jet2.x) < 5) {
                        turrelPlasmaShot(thisTurrel2)
                    }
                }
            }
        }
    }
})
game.onUpdateInterval(5000, function () {
    if (gamescreen == 3) {
        if (Math.percentChance(weaponType1 + weaponType2)) {
            contShield = sprites.create(assets.image`shield-cont`, SpriteKind.ContShield)
            contShield.setPosition(randint(0, scene.screenWidth()), 0)
            contShield.setVelocity(randint(-1, 1), 15)
            contShield.z += -5
            contShield.setFlag(SpriteFlag.AutoDestroy, true)
        }
    }
})
game.onUpdateInterval(12000, function () {
    if (gamescreen == 3) {
        if (info.player1.score() > 22 || info.player2.score() > 22) {
            if (Math.percentChance(33)) {
                contWeapon = sprites.create(assets.image`wp-cont`, SpriteKind.ContWeapon)
                contWeapon.setPosition(randint(0, scene.screenWidth()), 0)
                contWeapon.setVelocity(randint(-1, 1), 15)
                contWeapon.z += -5
                contWeapon.setFlag(SpriteFlag.AutoDestroy, true)
            }
        }
    }
})
game.onUpdateInterval(2000, function () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Explosion)
    sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
})
game.onUpdateInterval(100, function () {
    if (gamescreen == 3) {
        if (Math.percentChance(50)) {
            stjerne = sprites.createProjectileFromSide(assets.image`stjerne`, 0, randint(20, 30))
            stjerne.setPosition(randint(0, scene.screenWidth()), 0)
            stjerne.z += -6
            stjerne.setFlag(SpriteFlag.AutoDestroy, true)
        }
    }
})
game.onUpdateInterval(200, function () {
    if (gamescreen == 3) {
        if (Math.percentChance(10 + weaponType1 * weaponType2)) {
            spawnAsteroid(randint(1, 3))
        }
        if (Math.percentChance(5) && (weaponType1 >= 2 || weaponType2 >= 2)) {
            spawnMineStatic()
        }
        if (Math.percentChance(10) && (weaponType1 >= 3 || weaponType2 >= 3)) {
            spawnMineHoming()
        }
        if (Math.percentChance(2) && (weaponType1 >= 5 || weaponType2 >= 5)) {
            spawnTurrel()
        }
        if (Math.percentChance(1) && (weaponType1 >= 6 || weaponType2 >= 6)) {
            turrelBlastShot()
        }
    }
})
