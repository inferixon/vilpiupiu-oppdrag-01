namespace SpriteKind {
    export const MineHoming = SpriteKind.create()
    export const Weapon1 = SpriteKind.create()
    export const ContWeapon = SpriteKind.create()
    export const Explosion = SpriteKind.create()
    export const ContShield = SpriteKind.create()
    export const Asteroid = SpriteKind.create()
    export const Shield = SpriteKind.create()
    export const Splash = SpriteKind.create()
}
namespace StatusBarKind {
    export const Shield_1 = StatusBarKind.create()
}
sprites.onOverlap(SpriteKind.Weapon1, SpriteKind.ContWeapon, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    doExplosion(otherSprite)
})
function doStartGame () {
    scene.setBackgroundImage(assets.image`splash-3`)
    sprites.destroyAllSpritesOfKind(SpriteKind.Splash)
    sprites.destroyAllSpritesOfKind(SpriteKind.Text)
    // Simplified to single player - removed gamemp branching
    info.player1.setScore(0)
    statusbar1 = statusbars.create(20, 2, StatusBarKind.Shield_1)
    statusbar1.setColor(8, 2)
    statusbar1.positionDirection(CollisionDirection.Top)
    statusbar1.setOffsetPadding(-30, 0)
    gamescreen = 3
    spawnJet1()
}
// Simplified: removed player selection buttons - any button starts game
function showSplash () {
    scene.setBackgroundImage(assets.image`splash1bg`)
    sprites.destroyAllSpritesOfKind(SpriteKind.Splash)
    splash1title = sprites.create(assets.image`splash_title`, SpriteKind.Splash)
    splash1title.setScale(0.9, ScaleAnchor.Middle)
    splash1title.setPosition(80, 50)
}
sprites.onOverlap(SpriteKind.Weapon1, SpriteKind.ContShield, function (sprite27, otherSprite25) {
    sprites.destroy(sprite27)
    doExplosion(otherSprite25)
})
// Removed jetShot2() function - simplified to single player
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
    // Simplified to single player - always target jet1
    mineHoming.setFlag(SpriteFlag.AutoDestroy, true)
    mineHoming.follow(jet1, 24)
}
// Removed Weapon2 collision handlers - simplified to single player
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
// Removed Weapon2 collision handlers - simplified to single player
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (gamescreen == 3) {
        jetShot1(weaponType1)
    } else if (gamescreen == 1) {
        doStartGame()
    }
})
// Removed doShowTips() function - simplified game flow
sprites.onOverlap(SpriteKind.Weapon1, SpriteKind.MineHoming, function (sprite7, otherSprite6) {
    sprites.destroy(sprite7)
    doExplosion(otherSprite6)
    info.player1.changeScoreBy(5)
})
// Removed Weapon2 collision handlers - simplified to single player
function jetShot1 (num2: number) {
    if (num2 == 1) {
        laser = sprites.create(assets.image`lasershot-2x`, SpriteKind.Weapon1)
        laser.setPosition(jet1.x - 0, jet1.y - 8)
        laser.setVelocity(0, -222)
        laser.setFlag(SpriteFlag.AutoDestroy, true)
        music.play(music.createSoundEffect(WaveShape.Triangle, 1288, 137, 255, 0, 320, SoundExpressionEffect.Tremolo, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    }
    if (num2 == 2) {
        plasma = sprites.create(assets.image`plasmashot-3x`, SpriteKind.Weapon1)
        plasma.setPosition(jet1.x - 0, jet1.y - 12)
        plasma.setVelocity(0, -111)
        plasma.setFlag(SpriteFlag.AutoDestroy, true)
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 1199, 499, 255, 0, 557, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
}
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
        true        )
    }
    asteroid.setPosition(randint(0, scene.screenWidth()), 0)
    asteroid.setVelocity(randint(-3, 3), randint(8, 12))
    asteroid.z += -5
    asteroid.setFlag(SpriteFlag.AutoDestroy, true)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Asteroid, function (sprite23, otherSprite21) {
    music.play(music.createSoundEffect(WaveShape.Noise, 1, 147, 99, 0, 404, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    sprites.destroyAllSpritesOfKind(SpriteKind.Shield)    // Simplified to single player - only handle jet1
    controller.player1.moveSprite(jet1, 4, 2)
    statusbar1.value += randint(-10, -5)
    jetShield = sprites.create(assets.image`infershield`, SpriteKind.Shield)
    jetShield.setPosition(sprite23.x, sprite23.y)
    jetShield.z += -4
    controller.player1.moveSprite(jetShield, 4, 2)
    doExplosion(otherSprite21)
    scene.cameraShake(10, 200)
    pause(200)
    sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
    controller.player1.moveSprite(jet1, 80, 30)
})
function spawnJet1 () {
    jet1 = sprites.create(assets.image`jet-1`, SpriteKind.Player)
    // Simplified to single player - always center the jet
    jet1.setPosition(scene.screenWidth() / 2, scene.screenHeight() * 0.8)
    jet1.setStayInScreen(true)
    controller.player1.moveSprite(jet1, 100, 30)
    statusbar1.value = 100
}
statusbars.onZero(StatusBarKind.Shield_1, function (status2) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
    controller.player1.moveSprite(jet1, 0, 0)
    doExplosion(jet1)
    pause(1000)
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.MineHoming, function (sprite25, otherSprite23) {
    music.play(music.createSoundEffect(WaveShape.Noise, 1, 147, 99, 0, 404, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
    // Simplified to single player - only handle jet1    controller.player1.moveSprite(jet1, 4, 2)
    statusbar1.value += randint(-20, -15)
    jetShield = sprites.create(assets.image`infershield`, SpriteKind.Shield)
    jetShield.setPosition(sprite25.x, sprite25.y)
    jetShield.z += -4
    controller.player1.moveSprite(jetShield, 4, 2)
    doExplosion(otherSprite23)
    scene.cameraShake(10, 200)
    pause(200)
    sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
    controller.player1.moveSprite(jet1, 80, 30)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ContWeapon, function (sprite17, otherSprite16) {
    sprites.destroy(otherSprite16)
    music.play(music.createSoundEffect(WaveShape.Triangle, 333, 2643, 255, 0, 496, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    // Simplified to single player - only handle jet1
    if (weaponType1 < 2) {
        weaponType1 += 1
    }
})
sprites.onOverlap(SpriteKind.Weapon1, SpriteKind.Asteroid, function (sprite13, otherSprite12) {
    sprites.destroy(sprite13)
    doExplosion(otherSprite12)
    info.player1.changeScoreBy(1)
})
// Removed Weapon2 collision handlers - simplified to single player
sprites.onOverlap(SpriteKind.Player, SpriteKind.ContShield, function (sprite8, otherSprite7) {
    sprites.destroy(otherSprite7)
    // Simplified to single player - only handle jet1
    statusbar1.value += randint(5, 20)
    music.play(music.createSoundEffect(WaveShape.Sine, 1132, 2381, 146, 0, 444, SoundExpressionEffect.Vibrato, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
})
let stjerne: Sprite = null
let contWeapon: Sprite = null
let contShield: Sprite = null
let jetShield: Sprite = null
let asteroid: Sprite = null
let plasma: Sprite = null
let laser: Sprite = null
let explosion: Sprite = null
let mineHoming: Sprite = null
let splash1title: Sprite = null
let statusbar1: StatusBarSprite = null
let jet1: Sprite = null
let weaponType1 = 0
let gamescreen = 0
gamescreen = 1
weaponType1 = 1
showSplash()
game.onUpdateInterval(5000, function () {
    if (gamescreen == 3) {
        // Simplified to single player - only use weaponType1
        if (Math.percentChance(weaponType1 * 2)) {
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
        // Simplified to single player - only check player1 score
        if (info.player1.score() > 22) {
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
game.onUpdateInterval(100, function () {
    if (gamescreen == 3) {
        // Star background effects
        if (Math.percentChance(50)) {
            stjerne = sprites.createProjectileFromSide(assets.image`stjerne`, 0, randint(20, 30))
            stjerne.setPosition(randint(0, scene.screenWidth()), 0)
            stjerne.z += -6
            stjerne.setFlag(SpriteFlag.AutoDestroy, true)
        }
        
        // Spawn enemies every 200ms intervals
        if (game.runtime() % 200 == 0) {
            if (Math.percentChance(10 + weaponType1 * 2)) {
                spawnAsteroid(randint(1, 3))
            }
            if (Math.percentChance(10) && weaponType1 >= 2) {
                spawnMineHoming()
            }
        }
        
        // Cleanup every 2000ms intervals  
        if (game.runtime() % 2000 == 0) {
            sprites.destroyAllSpritesOfKind(SpriteKind.Explosion)
            sprites.destroyAllSpritesOfKind(SpriteKind.Shield)
        }
    }
})
